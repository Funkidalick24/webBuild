import type { TokenProfile } from '../lib/types';

export function tokenProfileToCssVars(profile: TokenProfile) {
  return {
    '--mx-color-accent-0': profile.accents[0],
    '--mx-color-accent-1': profile.accents[1],
    '--mx-color-accent-2': profile.accents[2],
    '--mx-color-accent-3': profile.accents[3],
    '--mx-color-accent-4': profile.accents[4],
  } as const;
}

