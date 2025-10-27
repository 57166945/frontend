import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import ClassesPage from './pages/ClassesPage';
import ReportsPage from './pages/ReportsPage';
import RatingsPage from './pages/RatingsPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import './App.css'

export default function App() {
  const { user } = useAuth();

  return (
    <div>
      <NavBar />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<WelcomePage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/ratings" element={<RatingsPage />} />
          </Route>

          <Route path="*" element={<div className="text-center">404 — page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
