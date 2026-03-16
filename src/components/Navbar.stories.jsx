import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../states/authSlice';
import Navbar from './Navbar';

const store = configureStore({
  reducer: { auth: authReducer },
});

export default {
  title: 'Components/Navbar',
  component: Navbar,
};

export const Default = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </Provider>
);
