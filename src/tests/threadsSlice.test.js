import threadsReducer, {
  setThreads,
  addThread,
} from '../states/threadsSlice';

describe('threadsSlice reducer', () => {
  test('should handle setThreads correctly', () => {
    const initialState = {
      data: [],
      filter: '',
    };

    const threads = [{ id: 'thread-1', title: 'Thread test' }];

    const nextState = threadsReducer(initialState, setThreads(threads));

    expect(nextState.data).toEqual(threads);
  });

  test('should handle addThread correctly', () => {
    const initialState = {
      data: [],
      filter: '',
    };

    const thread = {
      id: 'thread-1',
      title: 'New Thread',
    };

    const nextState = threadsReducer(initialState, addThread(thread));

    expect(nextState.data[0]).toEqual(thread);
  });
});
