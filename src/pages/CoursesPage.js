import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CourseForm from '../components/CourseForm';
import { useAuth } from '../contexts/AuthContext';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function load() {
    setLoading(true);
    try {
      const data = await api.CoursesAPI.list();
      setCourses(data || []);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Courses</h2>
        {['program_leader','admin'].includes(user?.role) && (
          <CourseForm onCreated={load} />
        )}
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Code</th><th>Lecturer</th><th>Actions</th></tr></thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.code}</td>
                <td>{c.assigned_lecturer_details?.full_name || '-'}</td>
                <td>
                  {['program_leader','admin'].includes(user?.role) && (
                    <button className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => {
                        const lect = prompt('Enter lecturer ID to assign (integer):');
                        if (!lect) return;
                        api.CoursesAPI.assign(c.id, Number(lect)).then(()=>load()).catch(e=>alert(e.message))
                      }}>
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
