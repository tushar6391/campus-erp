import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// attach token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data) => API.post('/auth/login/', data);
export const getStudentProfile = () => API.get('/student/profile/');
export const getAttendance = () => API.get('/student/attendance/');
export const getAttendanceSummary = () => API.get('/student/attendance/summary/');
export const getAssignments = () => API.get('/student/assignments/');
export const getResults = () => API.get('/student/results/');
export const getNotices = () => API.get('/notices/');
export const getTimetable = () => API.get('/student/timetable/');

export default API;