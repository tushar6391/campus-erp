import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function FacultyDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  const [assignment, setAssignment] = useState({
    title: '', subject: '', description: '', due_date: ''
  });
  const [notice, setNotice] = useState({
    title: '', content: '', target_role: 'all'
  });
  const [attendance, setAttendance] = useState({
    student_id: '', subject: '', date: '', status: 'present'
  });

  useEffect(() => {
    API.get('/faculty/profile/').then(r => setProfile(r.data)).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const submitAssignment = async () => {
    try {
      await API.post('/faculty/assignments/', assignment);
      setMessage('Assignment uploaded!');
      setAssignment({ title: '', subject: '', description: '', due_date: '' });
    } catch { setMessage('Error uploading assignment'); }
  };

  const submitNotice = async () => {
    try {
      await API.post('/faculty/notices/', notice);
      setMessage('Notice created!');
      setNotice({ title: '', content: '', target_role: 'all' });
    } catch { setMessage('Error creating notice'); }
  };

  const submitAttendance = async () => {
    try {
      await API.post('/faculty/attendance/mark/', [attendance]);
      setMessage('Attendance marked!');
      setAttendance({ student_id: '', subject: '', date: '', status: 'present' });
    } catch { setMessage('Error marking attendance'); }
  };

  const tabs = ['profile', 'attendance', 'assignments', 'notices'];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-48 bg-green-700 text-white flex flex-col">
        <div className="p-4 border-b border-green-600">
          <h1 className="text-lg font-bold">Campus ERP</h1>
          <p className="text-green-300 text-xs">Faculty Portal</p>
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-1 mt-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMessage(''); }}
              className={`w-full text-left px-4 py-2 rounded capitalize text-sm ${
                activeTab === tab
                  ? 'bg-white text-green-700 font-semibold'
                  : 'text-green-100 hover:bg-green-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-green-600">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-white text-green-700 rounded text-sm font-medium hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {message && (
          <p className="mb-4 text-green-700 font-medium bg-green-50 p-3 rounded">
            {message}
          </p>
        )}

        {/* Profile */}
        {activeTab === 'profile' && profile && (
          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">My Profile</h2>
            <p><span className="font-medium">Name:</span> {profile.full_name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">Employee ID:</span> {profile.employee_id}</p>
            <p><span className="font-medium">Department:</span> {profile.department}</p>
            <p><span className="font-medium">Subject:</span> {profile.subject}</p>
            <p><span className="font-medium">Phone:</span> {profile.phone || 'N/A'}</p>
          </div>
        )}

        {/* Mark Attendance */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">Mark Attendance</h2>
            <input className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Student ID" value={attendance.student_id}
              onChange={e => setAttendance({...attendance, student_id: e.target.value})} />
            <input className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Subject" value={attendance.subject}
              onChange={e => setAttendance({...attendance, subject: e.target.value})} />
            <input type="date" className="w-full border rounded px-3 py-2 mb-3"
              value={attendance.date}
              onChange={e => setAttendance({...attendance, date: e.target.value})} />
            <select className="w-full border rounded px-3 py-2 mb-4"
              value={attendance.status}
              onChange={e => setAttendance({...attendance, status: e.target.value})}>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <button onClick={submitAttendance}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Mark Attendance
            </button>
          </div>
        )}

        {/* Upload Assignment */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">Upload Assignment</h2>
            <input className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Title" value={assignment.title}
              onChange={e => setAssignment({...assignment, title: e.target.value})} />
            <input className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Subject" value={assignment.subject}
              onChange={e => setAssignment({...assignment, subject: e.target.value})} />
            <textarea className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Description" rows={3} value={assignment.description}
              onChange={e => setAssignment({...assignment, description: e.target.value})} />
            <input type="date" className="w-full border rounded px-3 py-2 mb-4"
              value={assignment.due_date}
              onChange={e => setAssignment({...assignment, due_date: e.target.value})} />
            <button onClick={submitAssignment}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Upload Assignment
            </button>
          </div>
        )}

        {/* Create Notice */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">Create Notice</h2>
            <input className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Title" value={notice.title}
              onChange={e => setNotice({...notice, title: e.target.value})} />
            <textarea className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Content" rows={4} value={notice.content}
              onChange={e => setNotice({...notice, content: e.target.value})} />
            <select className="w-full border rounded px-3 py-2 mb-4"
              value={notice.target_role}
              onChange={e => setNotice({...notice, target_role: e.target.value})}>
              <option value="all">All</option>
              <option value="student">Students Only</option>
              <option value="faculty">Faculty Only</option>
            </select>
            <button onClick={submitNotice}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Post Notice
            </button>
          </div>
        )}
      </main>
    </div>
  );
}