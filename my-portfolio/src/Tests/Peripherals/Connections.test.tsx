// Tests that the app initializes Firebase and exposes `auth`.
// AAA: Arrange = mock firebase modules, Act = import our firebase module, Assert = verify calls/exports.
import { describe, test, expect, vi } from 'vitest';

vi.mock('firebase/app', () => {
  return {
    initializeApp: vi.fn((config: any) => ({ __mockApp: true, config })),
  };
});

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn((app: any) => ({ __mockAuth: true, app })),
  };
});

describe('Firebase connection', () => {
  test('initializes firebase and exports auth', async () => {
    // Arrange: mocks above

    // Act: import the project's firebase entry (after mocks are set)
    const { auth } = await import('../../firebase');
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');

    // Assert: initialization functions were called and `auth` is from the mocked getAuth
    expect(initializeApp).toHaveBeenCalled();
    expect(getAuth).toHaveBeenCalled();
    expect(auth).toEqual({ __mockAuth: true, app: { __mockApp: true, config: expect.any(Object) } });
  });
});