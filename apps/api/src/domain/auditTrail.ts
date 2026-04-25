export type AuditEventType =
  | 'STRUCTURE_MUTATION'
  | 'TOKEN_MUTATION'
  | 'PUBLISH_REQUESTED'
  | 'PUBLISH_COMPLETED';

export type AuditEvent = {
  tenantId: string;
  siteId: string;
  userId: string;
  eventType: AuditEventType;
  at: string;
  details: Record<string, unknown>;
};

const inMemoryAuditTrail: AuditEvent[] = [];

export function recordAuditEvent(event: AuditEvent): void {
  inMemoryAuditTrail.push(event);
}

export function getAuditEvents(siteId: string): AuditEvent[] {
  return inMemoryAuditTrail.filter((event) => event.siteId === siteId);
}
