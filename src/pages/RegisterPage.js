import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // lowercase to match backend
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          faculty: "ICT"  // ✅ AUTO SET (as you requested — NO user input needed)
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      alert('Registration successful! Please log in.');
      nav('/login');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3 className="mb-3">Register</h3>
        <form onSubmit={handleRegister} className="card p-3 shadow-sm">
          {err && <div className="alert alert-danger">{err}</div>}

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value.toLowerCase())}
              required
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="principal_lecturer">Principal Lecturer (PRL)</option>
              <option value="program_leader">Program Leader (PL)</option>
            </select>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-success" type="submit">Register</button>
            <small>
              Already have an account?{' '}
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => nav('/login')}
              >
                Login
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
