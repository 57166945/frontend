import React, { useState } from 'react';
import api from '../services/api';

export default function CourseForm({ onCreated }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.CoursesAPI.create({ name, code });
      setName(''); setCode('');
      if (onCreated) onCreated();
      alert('Course created');
    } catch (err) {
      alert(err.message || 'Create failed');
    } finally { setSaving(false); }
  }

  return (
    <form className="d-flex gap-2" onSubmit={submit}>
      <input className="form-control form-control-sm" placeholder="Course name" value={name} onChange={e=>setName(e.target.value)} required />
      <input className="form-control form-control-sm" placeholder="Code (e.g. WD101)" value={code} onChange={e=>setCode(e.target.value)} required />
      <button className="btn btn-success btn-sm" disabled={saving}>Create</button>
    </form>
  );
}
