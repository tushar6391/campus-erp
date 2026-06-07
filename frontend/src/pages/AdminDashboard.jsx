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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Campus ERP — Admin</h1>
        <button onClick={handleLogout} className="bg-white text-red-700 px-4 py-1 rounded font-medium">
          Logout
        </button>
      </nav>

      <div className="flex gap-2 px-6 py-4 bg-white shadow">
        {tabs.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setMessage(''); }}
            className={`px-4 py-2 rounded capitalize font-medium ${
              activeTab === tab ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {message && <p className="mb-4 font-medium bg-green-50 text-green-700 p-3 rounded">{message}</p>}

        {/* Students */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add Student Form */}
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

            {/* Student List */}
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
            {/* Add Faculty Form */}
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

            {/* Faculty List */}
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
      </div>
    </div>
  );
}