// centralized API helper
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';



function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const err = (data && data.error) || (data && data.message) || res.statusText;
    throw new Error(err);
  }
  return data;
}

export const AuthAPI = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) })
};

export const CoursesAPI = {
  list: () => request('/courses'),
  get: (id) => request(`/courses/${id}`),
  create: (payload) => request('/courses', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  assign: (id, lecturerId) => request(`/courses/${id}/assign`, { method: 'POST', body: JSON.stringify({ lecturerId }) })
};

export const ClassesAPI = {
  list: () => request('/classes'),
  listByLecturer: (lecturerId) => request(`/classes/lecturer/${lecturerId}`),
  get: (id) => request(`/classes/${id}`),
  create: (payload) => request('/classes', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
};

export const ReportsAPI = {
  list: () => request('/reports'),
  getUserReports: (userId) => request(`/reports/user/${userId}`),
  create: (payload) => request('/reports', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/reports/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
};

export const RatingsAPI = {
  list: () => request('/ratings'),
  create: (payload) => request('/ratings', { method: 'POST', body: JSON.stringify(payload) })
};

export default { AuthAPI, CoursesAPI, ClassesAPI, ReportsAPI, RatingsAPI };

