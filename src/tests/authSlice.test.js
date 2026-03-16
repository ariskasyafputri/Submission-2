import authReducer, { setAuthUser, unsetAuthUser } from '../states/authSlice';

describe('authSlice reducer', () => {
  test('should return initial state when given unknown action', () => {
    const initialState = {
      user: null,
      isPreload: true,
    };

    const nextState = authReducer(initialState, { type: 'UNKNOWN' });

    expect(nextState).toEqual(initialState);
  });

  test('should handle setAuthUser correctly', () => {
    const initialState = {
      user: null,
      isPreload: true,
    };

    const user = {
      id: 'user-1',
      name: 'Farhan',
    };

    const nextState = authReducer(initialState, setAuthUser(user));

    expect(nextState.user).toEqual(user);
    expect(nextState.isPreload).toBe(false);
  });

  test('should handle unsetAuthUser correctly', () => {
    const initialState = {
      user: { id: 'user-1' },
      isPreload: true,
    };

    const nextState = authReducer(initialState, unsetAuthUser());

    expect(nextState.user).toBe(null);
    expect(nextState.isPreload).toBe(false);
  });
});
