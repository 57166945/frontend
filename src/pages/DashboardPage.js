import React, { useEffect, useState } from 'react';
import { ClassesAPI, CoursesAPI, ReportsAPI } from '../services/api';
import api from '../services/api';

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [c, cl, r] = await Promise.all([api.CoursesAPI.list(), api.ClassesAPI.list(), api.ReportsAPI.list()]);
        setCourses(c || []);
        setClasses(cl || []);
        setReports(r || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Courses</h5>
            <p className="display-6">{courses.length}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Classes</h5>
            <p className="display-6">{classes.length}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Reports</h5>
            <p className="display-6">{reports.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5>Recent Reports</h5>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>ID</th><th>Course</th><th>Lecturer</th><th>Date</th><th>Topic</th>
            </tr>
          </thead>
          <tbody>
            {reports.slice(0, 8).map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.course_id || r.course_code}</td>
                <td>{r.lecturer_name || r.lecturer_id}</td>
                <td>{r.date_of_lecture}</td>
                <td>{r.topic_taught}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
