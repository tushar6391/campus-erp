import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [message, setMessage] = useState('');

  const [newStudent, setNewStudent] = useState({
    email: '', password: '', full_name: '', roll_no: '',
    department: '', year: 1, semester: 1, phone: ''
  });
  const [newFaculty, setNewFaculty] = useState({
    email: '', password: '', full_name: '',
    employee_id: '', department: '', subject: '', phone: ''
  });

  useEffect(() => {
    API.get('/auth/admin/students/').then(r => setStudents(r.data)).catch(() => {});
    API.get('/auth/admin/faculty/').then(r => setFaculty(r.data)).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const submitStudent = async () => {
    try {
      const res = await API.post('/auth/admin/students/', newStudent);
      setStudents([...students, res.data]);
      setMessage('Student created!');
      setNewStudent({ email:'', password:'', full_name:'', roll_no:'', department:'', year:1, semester:1, phone:'' });
    } catch (e) { setMessage('Error: ' + JSON.stringify(e.response?.data)); }
  };

  const submitFaculty = async () => {
    try {
      const res = await API.post('/auth/admin/faculty/', newFaculty);
      setFaculty([...faculty, res.data]);
      setMessage('Faculty created!');
      setNewFaculty({ email:'', password:'', full_name:'', employee_id:'', department:'', subject:'', phone:'' });
    } catch (e) { setMessage('Error: ' + JSON.stringify(e.response?.data)); }
  };

  const tabs = ['students', 'faculty'];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-48 bg-red-700 text-white flex flex-col">
        <div className="p-4 border-b border-red-600">
          <h1 className="text-lg font-bold">Campus ERP</h1>
          <p className="text-red-300 text-xs">Admin Portal</p>
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-1 mt-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMessage(''); }}
              className={`w-full text-left px-4 py-2 rounded capitalize text-sm ${
                activeTab === tab
                  ? 'bg-white text-red-700 font-semibold'
                  : 'text-red-100 hover:bg-red-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-red-600">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-white text-red-700 rounded text-sm font-medium hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {message && (
          <p className="mb-4 font-medium bg-green-50 text-green-700 p-3 rounded">
            {message}
          </p>
        )}

        {/* Students */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-red-700">Add Student</h2>
              {['email','password','full_name','roll_no','department','phone'].map(field => (
                <input key={field} className="w-full border rounded px-3 py-2 mb-3"
                  placeholder={field.replace('_',' ')}
                  type={field === 'password' ? 'password' : 'text'}
                  value={newStudent[field]}
                  onChange={e => setNewStudent({...newStudent, [field]: e.target.value})} />
              ))}
              <div className="flex gap-2 mb-4">
                <input type="number" className="w-full border rounded px-3 py-2"
                  placeholder="Year" value={newStudent.year}
                  onChange={e => setNewStudent({...newStudent, year: e.target.value})} />
                <input type="number" className="w-full border rounded px-3 py-2"
                  placeholder="Semester" value={newStudent.semester}
                  onChange={e => setNewStudent({...newStudent, semester: e.target.value})} />
              </div>
              <button onClick={submitStudent}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Add Student
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-red-700">All Students ({students.length})</h2>
              {students.map(s => (
                <div key={s.id} className="border rounded p-3 mb-2">
                  <p className="font-medium">{s.full_name}</p>
                  <p className="text-sm text-gray-500">{s.email} — {s.roll_no} — {s.department}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Faculty */}
        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-red-700">Add Faculty</h2>
              {['email','password','full_name','employee_id','department','subject','phone'].map(field => (
                <input key={field} className="w-full border rounded px-3 py-2 mb-3"
                  placeholder={field.replace('_',' ')}
                  type={field === 'password' ? 'password' : 'text'}
                  value={newFaculty[field]}
                  onChange={e => setNewFaculty({...newFaculty, [field]: e.target.value})} />
              ))}
              <button onClick={submitFaculty}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Add Faculty
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-red-700">All Faculty ({faculty.length})</h2>
              {faculty.map(f => (
                <div key={f.id} className="border rounded p-3 mb-2">
                  <p className="font-medium">{f.full_name}</p>
                  <p className="text-sm text-gray-500">{f.email} — {f.employee_id} — {f.subject}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}