import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ClassForm from '../components/ClassForm';
import { useAuth } from '../contexts/AuthContext';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function load() {
    setLoading(true);
    try {
      const data = await api.ClassesAPI.list();
      setClasses(data || []);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to load classes');
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Classes</h2>
        {['lecturer','program_leader','admin'].includes(user?.role) && <ClassForm onCreated={load} />}
      </div>

      {loading ? <div>Loading classes...</div> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Course</th><th>Lecturer</th><th>Venue</th></tr></thead>
          <tbody>
            {classes.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.course_details?.name || c.course_id}</td>
                <td>{c.lecturer_details?.full_name || '-'}</td>
                <td>{c.venue || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}