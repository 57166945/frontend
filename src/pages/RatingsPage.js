import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RatingForm from '../components/RatingForm';
import { useAuth } from '../contexts/AuthContext';

export default function RatingsPage() {
  const [ratings, setRatings] = useState([]);
  const { user } = useAuth();

  async function load(){ try{ const r = await api.RatingsAPI.list(); setRatings(r || []); }catch(e){console.error(e)} }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Ratings</h2>
        {user?.role === 'student' && <RatingForm onCreated={load} />}
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Student</th><th>Lecturer</th><th>Course</th><th>Score</th><th>Comment</th></tr></thead>
        <tbody>
          {ratings.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.student?.full_name || r.student_id}</td>
              <td>{r.lecturer?.full_name || r.lecturer_id}</td>
              <td>{r.course?.name || r.course_id}</td>
              <td>{r.score}</td>
              <td>{r.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
