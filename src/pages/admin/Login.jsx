import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../services/apiClient';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/admin/login', { username, password });
      const token = response.data?.data?.token;
      if (!token) throw new Error('No token returned');

      localStorage.removeItem("adminToken");
      localStorage.setItem('adminToken', token);
      toast.success('Login successful.');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card mock-login-card mx-auto">
      <h1>Admin Login</h1>
      <p className="text-muted">Sign in with the backend admin credentials.</p>
      <form className="vstack gap-3" onSubmit={login}>
        <input className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
        <input className="form-control" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
    </div>
  );
}
