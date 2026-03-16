import { asyncFetchThreads } from '../states/threadsSlice';
import api from '../utils/api';

jest.mock('../utils/api');

describe('asyncFetchThreads thunk', () => {
  test('should dispatch setThreads when success', async () => {
    const dispatch = jest.fn();

    api.getThreads.mockResolvedValue({
      data: {
        threads: [
          {
            id: 'thread-1',
            ownerId: 'user-1',
          },
        ],
      },
    });

    api.getUsers.mockResolvedValue({
      data: {
        users: [
          {
            id: 'user-1',
            name: 'Farhan',
          },
        ],
      },
    });

    await asyncFetchThreads()(dispatch);

    expect(dispatch).toHaveBeenCalled();
  });
});
