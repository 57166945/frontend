import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function ReportForm({ onCreated }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    faculty_name: '',
    class_name: '',
    week_of_reporting: '',
    date_of_lecture: '',
    course_id: '',
    course_code: '',
    lecturer_name: '',
    actual_number_of_students: '',
    total_registered_students: '',
    venue: '',
    scheduled_lecture_time: '',
    topic_taught: '',
    learning_outcomes: '',
    lecturer_recommendations: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.CoursesAPI.list()
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  async function submit(e) {
  e.preventDefault();
  setSaving(true);
  try {
    const { lecturer_name, ...safeForm } = form; // ✅ strip it out completely

    const payload = { 
      ...safeForm,
      lecturer_id: user.id, 
      created_by: user.id 
    };

    await api.ReportsAPI.create(payload);
    alert('Report created successfully');
    if (onCreated) onCreated();

    setForm({
      faculty_name: '',
      class_name: '',
      week_of_reporting: '',
      date_of_lecture: '',
      course_id: '',
      course_code: '',
      actual_number_of_students: '',
      total_registered_students: '',
      venue: '',
      scheduled_lecture_time: '',
      topic_taught: '',
      learning_outcomes: '',
      lecturer_recommendations: ''
    });
  } catch (err) {
    alert(err.message || 'Failed to create report');
  } finally {
    setSaving(false);
  }
}

  return (
    <form onSubmit={submit} className="card p-3 mb-3">
      <div className="row g-2">

        {/* Faculty Name */}
        <div className="col-md-4">
          <label className="form-label">Faculty Name</label>
          <input
            className="form-control"
            value={form.faculty_name}
            onChange={e => setForm({ ...form, faculty_name: e.target.value })}
            placeholder="e.g. Faculty of ICT"
            required
          />
        </div>

        {/* Class Name */}
        <div className="col-md-4">
          <label className="form-label">Class Name</label>
          <input
            className="form-control"
            value={form.class_name}
            onChange={e => setForm({ ...form, class_name: e.target.value })}
            placeholder="e.g. SE-21-A"
            required
          />
        </div>

        {/* Week of Reporting */}
        <div className="col-md-4">
          <label className="form-label">Week of Reporting</label>
          <input
            type="number"
            className="form-control"
            value={form.week_of_reporting}
            onChange={e => setForm({ ...form, week_of_reporting: e.target.value })}
            required
          />
        </div>

        {/* Date of Lecture */}
        <div className="col-md-3">
          <label className="form-label">Date of Lecture</label>
          <input
            type="date"
            className="form-control"
            value={form.date_of_lecture}
            onChange={e => setForm({ ...form, date_of_lecture: e.target.value })}
            required
          />
        </div>

        {/* Course Selection */}
        <div className="col-md-3">
          <label className="form-label">Course</label>
          <select
            className="form-select"
            value={form.course_id}
            onChange={e => setForm({ ...form, course_id: Number(e.target.value) })}
            required
          >
            <option value="">Select course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Course Code */}
        <div className="col-md-3">
          <label className="form-label">Course Code</label>
          <input
            className="form-control"
            value={form.course_code}
            onChange={e => setForm({ ...form, course_code: e.target.value })}
            placeholder="e.g. SE1101"
            required
          />
        </div>

       

        {/* Venue */}
        <div className="col-md-4">
          <label className="form-label">Venue</label>
          <input
            className="form-control"
            value={form.venue}
            onChange={e => setForm({ ...form, venue: e.target.value })}
            placeholder="e.g. Lab 3A"
            required
          />
        </div>

        {/* Scheduled Lecture Time */}
        <div className="col-md-4">
          <label className="form-label">Scheduled Lecture Time</label>
          <input
            type="time"
            className="form-control"
            value={form.scheduled_lecture_time}
            onChange={e => setForm({ ...form, scheduled_lecture_time: e.target.value })}
            required
          />
        </div>

        {/* Topic Taught */}
        <div className="col-md-4">
          <label className="form-label">Topic Taught</label>
          <input
            className="form-control"
            value={form.topic_taught}
            onChange={e => setForm({ ...form, topic_taught: e.target.value })}
            required
          />
        </div>

        {/* Learning Outcomes */}
        <div className="col-md-6">
          <label className="form-label">Learning Outcomes</label>
          <textarea
            className="form-control"
            value={form.learning_outcomes}
            onChange={e => setForm({ ...form, learning_outcomes: e.target.value })}
            rows={2}
          />
        </div>

        {/* Lecturer Recommendations */}
        <div className="col-md-6">
          <label className="form-label">Lecturer’s Recommendations</label>
          <textarea
            className="form-control"
            value={form.lecturer_recommendations}
            onChange={e => setForm({ ...form, lecturer_recommendations: e.target.value })}
            rows={2}
          />
        </div>

        {/* Student Attendance Numbers */}
        <div className="col-md-3">
          <label className="form-label">Actual Students Present</label>
          <input
            type="number"
            className="form-control"
            value={form.actual_number_of_students}
            onChange={e => setForm({ ...form, actual_number_of_students: Number(e.target.value) })}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Total Registered Students</label>
          <input
            type="number"
            className="form-control"
            value={form.total_registered_students}
            onChange={e => setForm({ ...form, total_registered_students: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Create Report'}
        </button>
      </div>
    </form>
  );
}
