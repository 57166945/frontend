import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function RatingForm({ onCreated }) {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(()=>{ api.CoursesAPI.list().then(setCourses).catch(()=>setCourses([])); }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await api.RatingsAPI.create({ course_id: Number(courseId), lecturer_id: Number(lecturerId), score: Number(score), comment });
      if (onCreated) onCreated();
      setCourseId(''); setLecturerId(''); setScore(5); setComment('');
      alert('Rating submitted');
    } catch (err) {
      alert(err.message || 'Failed to submit rating');
    }
  }

  return (
    <form className="d-flex gap-2" onSubmit={submit}>
      <select className="form-select form-select-sm" value={courseId} onChange={e=>setCourseId(e.target.value)} required>
        <option value="">Course</option>
        {courses.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input className="form-control form-control-sm" placeholder="Lecturer ID" value={lecturerId} onChange={e=>setLecturerId(e.target.value)} required/>
      <select className="form-select form-select-sm" value={score} onChange={e=>setScore(e.target.value)} required>
        {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
      </select>
      <button className="btn btn-success btn-sm" type="submit">Rate</button>
    </form>
  );
}
