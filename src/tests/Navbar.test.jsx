import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/authSlice';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

describe('Navbar component', () => {

  test('should show login button when user not logged in', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();

  });

});