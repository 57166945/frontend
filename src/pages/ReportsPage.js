import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ReportForm from '../components/ReportForm';
import { useAuth } from '../contexts/AuthContext';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function load() {
    setLoading(true);
    try {
      const data = await api.ReportsAPI.list();
      setReports(data || []);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to load reports');
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reports</h2>
        {['lecturer','program_leader','principal_lecturer'].includes(user?.role) && <ReportForm onCreated={load} />}
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="table table-sm">
          <thead>
  <tr>
    <th>ID</th>
    <th>Date</th>
    <th>Course</th>
    <th>Class</th>
    <th>Week</th>
    <th>Lecturer</th>
    <th>Present</th>
    <th>Total</th>
    <th>Topic</th>
    <th>Venue</th>
  </tr>
</thead>

<tbody>
  {reports.map(r => (
    <tr key={r.id}>
      <td>{r.id}</td>
      <td>{r.date_of_lecture}</td>
      <td>{r.course_name || r.course_id}</td>
      <td>{r.class_name}</td>
      <td>{r.week_of_reporting}</td>
      <td>{r.lecturer || r.lecturer_id}</td>
      <td>{r.actual_number_of_students}</td>
      <td>{r.total_registered_students}</td>
      <td>{r.topic_taught}</td>
      <td>{r.venue}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
