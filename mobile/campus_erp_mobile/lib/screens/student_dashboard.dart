import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'login_screen.dart';

class StudentDashboard extends StatefulWidget {
  const StudentDashboard({super.key});
  @override
  State<StudentDashboard> createState() => _StudentDashboardState();
}

class _StudentDashboardState extends State<StudentDashboard> {
  Map<String, dynamic>? profile;
  List<dynamic> assignments = [];
  List<dynamic> attendance = [];
  List<dynamic> notices = [];
  int currentTab = 0;

  @override
  void initState() {
    super.initState();
    loadData();
  }

  void loadData() async {
    try {
      final p = await ApiService.getProfile();
      final a2 = await ApiService.getAssignments();
      setState(() { assignments = a2; });
      final a = await ApiService.getAttendanceSummary();
      final n = await ApiService.getNotices();
      setState(() { profile = p; attendance = a; notices = n; });
    } catch (e) {}
  }

  void handleLogout() async {
    await ApiService.logout();
    if (mounted) {
      Navigator.pushReplacement(context,
        MaterialPageRoute(builder: (_) => const LoginScreen()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Campus ERP'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        actions: [
          IconButton(icon: const Icon(Icons.logout), onPressed: handleLogout)
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentTab,
        onTap: (i) => setState(() => currentTab = i),
        type: BottomNavigationBarType.fixed,  // ← add this
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        selectedFontSize: 10,  // ← smaller text
        unselectedFontSize: 10,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Assignments'),
          BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Attendance'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Notices'),
        ],
      ),
      body: [
        _buildProfile(),
        _buildAssignments(),
        _buildAttendance(),
        _buildNotices(),
      ][currentTab],
    );
  }

  Widget _buildProfile() {
    if (profile == null) return const Center(child: CircularProgressIndicator());
    return ListView(padding: const EdgeInsets.all(16), children: [
      Card(child: ListTile(
        leading: const Icon(Icons.person, color: Colors.blue),
        title: Text(profile!['full_name'] ?? ''),
        subtitle: Text(profile!['email'] ?? ''),
      )),
      Card(child: ListTile(title: const Text('Roll No'), subtitle: Text(profile!['roll_no'] ?? ''))),
      Card(child: ListTile(title: const Text('Department'), subtitle: Text(profile!['department'] ?? ''))),
      Card(child: ListTile(title: const Text('Year'), subtitle: Text('Year ${profile!['year']}'))),
      Card(child: ListTile(title: const Text('Semester'), subtitle: Text('Semester ${profile!['semester']}'))),
    ]);
  }

  Widget _buildAssignments() {
    if (assignments.isEmpty) return const Center(child: Text('No assignments'));
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: assignments.length,
      itemBuilder: (ctx, i) {
        final a = assignments[i];
        return Card(
          child: ListTile(
            leading: const Icon(Icons.assignment, color: Colors.blue),
            title: Text(a['title']),
            subtitle: Text('${a['subject']} — Due: ${a['due_date']}'),
            trailing: Text(a['faculty_name'] ?? ''),
          ),
        );
      },
    );
  }

  Widget _buildAttendance() {
    if (attendance.isEmpty) return const Center(child: CircularProgressIndicator());
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: attendance.length,
      itemBuilder: (ctx, i) {
        final a = attendance[i];
        final pct = a['percentage'] as double;
        return Card(
          child: ListTile(
            title: Text(a['subject']),
            subtitle: Text('${a['present']}/${a['total']} classes'),
            trailing: Text(
              '${pct.toStringAsFixed(1)}%',
              style: TextStyle(
                color: pct < 75 ? Colors.red : Colors.green,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildNotices() {
    if (notices.isEmpty) return const Center(child: Text('No notices'));
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: notices.length,
      itemBuilder: (ctx, i) {
        final n = notices[i];
        return Card(
          child: ListTile(
            leading: const Icon(Icons.announcement, color: Colors.blue),
            title: Text(n['title']),
            subtitle: Text(n['content']),
          ),
        );
      },
    );
  }
}