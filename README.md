# 🎓 Campus ERP System

A full-stack **Campus Enterprise Resource Planning (ERP) System** built as a final year project. Manages students, faculty, attendance, assignments, results, timetables, and notices — with role-based access for Admin, Faculty, and Student.

---

## 🚀 Live Demo

> Run locally using setup instructions below.

---

## 📸 Screenshots

| Login | Student Dashboard | Faculty Dashboard |
|---|---|---|
| *(Add screenshot)* | *(Add screenshot)* | *(Add screenshot)* |

| Admin Dashboard | Flutter Mobile App |
|---|---|
| *(Add screenshot)* | *(Add screenshot)* |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Django REST Framework (Python) |
| **Frontend** | React.js + Tailwind CSS |
| **Mobile** | Flutter (Android) |
| **Database** | MySQL |
| **Authentication** | JWT via SimpleJWT |
| **API Testing** | Thunder Client |

---

## 👥 User Roles

### 🔵 Student
- Login with JWT authentication
- View personal profile
- Track attendance with percentage per subject
- View assignments uploaded by faculty
- View results with grades and percentage
- Read notices (filtered by role)
- View class timetable

### 🟢 Faculty
- Login with JWT authentication
- Mark student attendance (present/absent)
- Upload assignments with due dates
- Upload student results and grades
- Create notices for students or all users

### 🔴 Admin
- Add and view all students
- Add and view all faculty
- Manage class timetable
- Full Django admin panel access

---

## 📁 Project Structure

```
campus-erp/
│
├── backend/                  # Django REST Framework API
│   ├── campus_erp/           # Project settings and root URLs
│   ├── core/                 # Custom User model + JWT auth + permissions
│   ├── students/             # Student model, serializers, APIs
│   ├── faculty/              # Faculty model, serializers, APIs
│   ├── attendance/           # Attendance tracking APIs
│   ├── assignments/          # Assignment upload and view APIs
│   ├── results/              # Result upload and view APIs
│   ├── timetable/            # Timetable management APIs
│   ├── notices/              # Notice creation and filtering APIs
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                 # React.js + Tailwind CSS
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── StudentDashboard.jsx
│       │   ├── FacultyDashboard.jsx
│       │   └── AdminDashboard.jsx
│       ├── services/
│       │   └── api.js        # Axios instance + all API calls
│       └── context/
│           └── AuthContext.jsx  # JWT token management
│
└── mobile/                   # Flutter Android App
    └── campus_erp_mobile/
        └── lib/
            ├── main.dart
            ├── screens/
            │   ├── login_screen.dart
            │   └── student_dashboard.dart
            └── services/
                └── api_service.dart
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- Flutter 3.x
- MySQL (XAMPP or standalone)
- Git

---

### 🔧 Backend Setup

```bash
# Clone the repo
git clone https://github.com/tushar6391/campus-erp.git
cd campus-erp

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# Install dependencies
pip install -r backend/requirements.txt

# Create MySQL database
# Open phpMyAdmin or MySQL shell and run:
# CREATE DATABASE campus_erp_db;

# Create .env file in backend/ folder
# (see Environment Variables section below)

# Run migrations
cd backend
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
# Opens at http://localhost:3000
```

---

### 📱 Mobile Setup

```bash
cd mobile/campus_erp_mobile
flutter pub get

# Start Android emulator or connect device
flutter run
```

---

## 🔐 Environment Variables

Create `backend/.env` file:

```env
SECRET_KEY=your-django-secret-key-here
DB_NAME=campus_erp_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login/` | Login — returns JWT access + refresh token |
| POST | `/api/auth/token/refresh/` | Refresh access token |

### Student
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/student/profile/` | Get student profile |
| GET | `/api/student/attendance/` | Get attendance records |
| GET | `/api/student/attendance/summary/` | Get attendance % per subject |
| GET | `/api/student/assignments/` | Get assignments by department |
| GET | `/api/student/results/` | Get results (filter by `?semester=`) |
| GET | `/api/student/timetable/` | Get timetable by department + year |
| GET | `/api/notices/` | Get notices filtered by role |

### Faculty
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/faculty/profile/` | Get faculty profile |
| POST | `/api/faculty/attendance/mark/` | Mark student attendance |
| POST | `/api/faculty/assignments/` | Upload assignment |
| POST | `/api/faculty/results/` | Upload student result |
| POST | `/api/faculty/notices/` | Create notice |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/api/auth/admin/students/` | List or add students |
| GET/POST | `/api/auth/admin/faculty/` | List or add faculty |
| GET/POST | `/api/auth/admin/timetable/` | List or manage timetable |

> All endpoints except login require `Authorization: Bearer <token>` header.

---

## 🗃️ Database Schema

```
User (custom)       → email, full_name, role (admin/faculty/student)
Student             → user (FK), roll_no, department, year, semester
Faculty             → user (FK), employee_id, department, subject
Attendance          → student (FK), subject, date, status, marked_by
Assignment          → faculty (FK), subject, title, description, due_date
Result              → student (FK), subject, marks, max_marks, grade, semester
Timetable           → department, year, day, subject, time_slot, faculty (FK)
Notice              → created_by (FK), title, content, target_role
```

---

## 🔑 Key Technical Decisions

- **Custom User Model** — Single user table with `role` field for all 3 roles. Login via email instead of username.
- **JWT Authentication** — Short-lived access token (60 min) + long-lived refresh token (7 days). Token contains user role for frontend routing.
- **Role-Based Access** — Custom `IsAdmin`, `IsFaculty`, `IsStudent` permission classes in DRF.
- **pymongo not djongo** — Used `mysqlclient` directly due to Python 3.11 compatibility.

---

## 🧪 Testing

APIs tested using **Thunder Client** (VS Code extension).

Test accounts (set up locally via admin panel):
- Admin: create via `python manage.py createsuperuser`
- Faculty: add via Admin panel or `/api/auth/admin/faculty/`
- Student: add via Admin panel or `/api/auth/admin/students/`

---


## 👨‍💻 Developer

**Tushar Kumare**
B.Tech Computer Science (Data Science Specialization)
Sardar Patel Institute of Technology (SPIT), Mumbai

- GitHub: [@tushar6391](https://github.com/tushar6391)

---

