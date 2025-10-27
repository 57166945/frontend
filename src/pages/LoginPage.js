import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      nav('/dashboard');
    } catch (error) {
      setErr(error.message || 'Login failed');
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3 className="mb-3">Login</h3>
        <form onSubmit={submit} className="card p-3 shadow-sm">
          {err && <div className="alert alert-danger">{err}</div>}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary" type="submit">Login</button>
            <small>
              Don't have an account?{' '}
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => nav('/register')}
              >
                Register
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
