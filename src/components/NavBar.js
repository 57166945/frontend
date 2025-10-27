import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  const navItems = [];
  if (user) {
    if (user.role === 'student') navItems.push({ label: 'Monitoring', path: '/dashboard' }, { label: 'Rating', path: '/ratings' });
    if (user.role === 'lecturer') navItems.push({ label: 'Classes', path: '/classes' }, { label: 'Reports', path: '/reports' }, { label: 'Monitoring', path: '/dashboard' }, { label: 'Rating', path: '/ratings' });
    if (user.role === 'principal_lecturer') navItems.push({ label: 'Courses', path: '/courses' }, { label: 'Reports', path: '/reports' }, { label: 'Monitoring', path: '/dashboard' }, { label: 'Rating', path: '/ratings' }, { label: 'Classes', path: '/classes' });
    if (user.role === 'program_leader') navItems.push({ label: 'Courses', path: '/courses' }, { label: 'Reports', path: '/reports' }, { label: 'Monitoring', path: '/dashboard' }, { label: 'Classes', path: '/classes' }, { label: 'Rating', path: '/ratings' });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-2" 
    style={{ borderBottom: '1px solid #1f34f3ff', backgroundColor: 'dark-gray' }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="LUCT Logo" style={{  float: 'left', marginLeft: -90 }} />
          <span className="fw-bold" style={{ color: '#228bf5ff' }}>LUCT Reporting System</span>
        </Link>

        {user && (
          <ul className="navbar-nav ms-4 me-auto">
            {navItems.map((item, idx) => (
              <li className="nav-item" key={idx}>
                <Link className="nav-link" to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        )}

        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-muted">{user.full_name} ({user.role})</span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary btn-sm me-2" to="/home">Home</Link>
              <Link className="btn btn-outline-primary btn-sm me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-primary btn-sm" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
