import type { PipelineOutput, TokenProfile, VersionedComponentTree } from './types';

// For the prototype, we serve a local mock API from the Next.js app itself (same-origin).
// You can point this at a real backend by setting NEXT_PUBLIC_API_URL.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const SCHEMA_VERSION = '1.0.0';

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const api = {
  async generateSite(prompt: string) {
    return requestJson<PipelineOutput>('/v1/ai/generate-site', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  },
  async getSite(siteId: string) {
    return requestJson<{ siteId: string; name: string; generation: PipelineOutput }>(
      `/v1/sites/${encodeURIComponent(siteId)}`
    );
  },
  async updateTokenProfile(siteId: string, tokenProfile: TokenProfile) {
    return requestJson<{ ok: true }>(`/v1/sites/${encodeURIComponent(siteId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ tokenProfile }),
    });
  },
  async createSiteFromPrompt(prompt: string) {
    const generation = await api.generateSite(prompt);
    const created = await requestJson<{ siteId: string }>('/v1/sites', {
      method: 'POST',
      body: JSON.stringify({ name: 'Draft Site', generation }),
    });
    const pageId = `${created.siteId}_home`;
    const nodes = generation.sectionPlan.sections.map((section, index) => ({
      id: `sec_${created.siteId}_${index}`,
      type: section.type,
      metadata: { sectionIndex: index },
    }));
    await api.saveLayout({ schemaVersion: SCHEMA_VERSION, pageId, nodes });
    return created;
  },
  async saveLayout(tree: VersionedComponentTree) {
    return requestJson<{ ok: true }>('/v1/pages/layout', {
      method: 'PATCH',
      body: JSON.stringify(tree),
    });
  },
  async getLayout(pageId: string) {
    return requestJson<{ pageId: string; tree: VersionedComponentTree | null }>(
      `/v1/pages/${encodeURIComponent(pageId)}/layout`
    );
  },
  async publish(siteId: string) {
    return requestJson<{ versionId: string; url: string }>(`/v1/publish/${encodeURIComponent(siteId)}`, {
      method: 'POST',
    });
  },
};
