import { asyncLogin } from '../states/authSlice';
import api from '../utils/api';

jest.mock('../utils/api');

describe('asyncLogin thunk', () => {
  test('should dispatch actions correctly when login success', async () => {
    const dispatch = jest.fn();

    api.login.mockResolvedValue({
      data: { token: 'token-test' },
    });

    api.getOwnProfile.mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
          name: 'Farhan',
        },
      },
    });

    await asyncLogin({
      email: 'test@mail.com',
      password: '123',
    })(dispatch);

    expect(dispatch).toHaveBeenCalled();
  });
});
