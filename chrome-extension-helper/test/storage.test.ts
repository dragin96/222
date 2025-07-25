import { describe, it, expect, vi } from 'vitest';
import { saveSettings, loadSettings, STORAGE_KEY } from '../src/utils/storage';
import type { Settings } from '../src/types';

const mockStorage: Record<string, unknown> = {};

vi.stubGlobal('chrome', {
  storage: {
    local: {
      set: (items: Record<string, unknown>, cb: () => void) => {
        Object.assign(mockStorage, items);
        cb();
      },
      get: (_keys: string[], cb: (items: Record<string, unknown>) => void) => {
        cb(mockStorage as Record<string, unknown>);
      }
    }
  },
  runtime: {
    lastError: undefined
  }
});

describe('storage utils', () => {
  it('saves and loads settings', async () => {
    const s: Settings = { apiUrl: 'a', token: 'b' };
    await saveSettings(s);
    const res = await loadSettings();
    expect(res).toEqual(s);
    expect(mockStorage[STORAGE_KEY]).toEqual(s);
  });
});
