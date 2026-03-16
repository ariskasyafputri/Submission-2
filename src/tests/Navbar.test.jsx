import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../states/authSlice';
import Navbar from '../components/Navbar';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('Navbar component', () => {
  test('should show login button when user not logged in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
