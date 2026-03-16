// D:\ASAH\REACT EXPERT\forum-app - Copy\src\pages\RegisterPage.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegister } from '../states/authSlice';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(asyncRegister(form));
    navigate('/login');
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })
        }
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })
        }
      />
      <button type="submit">Register</button>
    </form>
  );
}
