import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ClassForm({ onCreated }) {
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [courses, setCourses] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.CoursesAPI.list().then(setCourses).catch(()=>setCourses([]));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.ClassesAPI.create({ name, course_id: Number(courseId), lecturer_id: lecturerId ? Number(lecturerId) : undefined });
      setName(''); setCourseId(''); setLecturerId('');
      if (onCreated) onCreated();
      alert('Class created');
    } catch (err) {
      alert(err.message || 'Failed to create class');
    } finally { setSaving(false); }
  }

  return (
    <form className="d-flex gap-2" onSubmit={submit}>
      <input className="form-control form-control-sm" placeholder="Class name" value={name} onChange={e=>setName(e.target.value)} required />
      <select className="form-select form-select-sm" value={courseId} onChange={e=>setCourseId(e.target.value)} required>
        <option value="">Select course</option>
        {courses.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
      </select>
      <input className="form-control form-control-sm" placeholder="Lecturer ID (optional)" value={lecturerId} onChange={e=>setLecturerId(e.target.value)} />
      <button className="btn btn-success btn-sm" disabled={saving}>Create</button>
    </form>
  );
}
