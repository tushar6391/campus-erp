import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  getStudentProfile,
  getAttendanceSummary,
  getAssignments,
  getResults,
  getNotices,
  getTimetable
} from '../services/api';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [results, setResults] = useState([]);
  const [notices, setNotices] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    getStudentProfile().then(r => setProfile(r.data));
    getAttendanceSummary().then(r => setAttendance(r.data));
    getAssignments().then(r => setAssignments(r.data));
    getResults().then(r => setResults(r.data));
    getNotices().then(r => setNotices(r.data));
    getTimetable().then(r => setTimetable(r.data));
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const tabs = ['profile','attendance','assignments','results','notices','timetable'];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Campus ERP — Student</h1>
        <button onClick={handleLogout} className="bg-white text-blue-700 px-4 py-1 rounded font-medium hover:bg-gray-100">
          Logout
        </button>
      </nav>

      {/* Tabs */}
      <div className="flex gap-2 px-6 py-4 bg-white shadow">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize font-medium ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Profile */}
        {activeTab === 'profile' && profile && (
          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-700">My Profile</h2>
            <p><span className="font-medium">Name:</span> {profile.full_name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">Roll No:</span> {profile.roll_no}</p>
            <p><span className="font-medium">Department:</span> {profile.department}</p>
            <p><span className="font-medium">Year:</span> {profile.year}</p>
            <p><span className="font-medium">Semester:</span> {profile.semester}</p>
          </div>
        )}

        {/* Attendance */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Attendance Summary</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Present</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border">{a.subject}</td>
                    <td className="p-3 border">{a.present}</td>
                    <td className="p-3 border">{a.total}</td>
                    <td className={`p-3 border font-medium ${a.percentage < 75 ? 'text-red-500' : 'text-green-600'}`}>
                      {a.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Assignments */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Assignments</h2>
            {assignments.map(a => (
              <div key={a.id} className="border rounded p-4 mb-3">
                <h3 className="font-bold text-lg">{a.title}</h3>
                <p className="text-gray-600">{a.subject} — {a.faculty_name}</p>
                <p className="mt-2">{a.description}</p>
                <p className="text-sm text-red-500 mt-2">Due: {a.due_date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Results</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Marks</th>
                  <th className="p-3 border">Max</th>
                  <th className="p-3 border">Grade</th>
                  <th className="p-3 border">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{r.subject}</td>
                    <td className="p-3 border">{r.marks}</td>
                    <td className="p-3 border">{r.max_marks}</td>
                    <td className="p-3 border font-bold">{r.grade}</td>
                    <td className="p-3 border">{r.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Notices */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Notices</h2>
            {notices.map(n => (
              <div key={n.id} className="border-l-4 border-blue-500 pl-4 mb-4">
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-gray-600 text-sm">{n.created_by_name} — {new Date(n.created_at).toLocaleDateString()}</p>
                <p className="mt-1">{n.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Timetable */}
        {activeTab === 'timetable' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Timetable</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Day</th>
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Faculty</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">{t.day}</td>
                    <td className="p-3 border">{t.subject}</td>
                    <td className="p-3 border">{t.time_slot}</td>
                    <td className="p-3 border">{t.faculty_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}