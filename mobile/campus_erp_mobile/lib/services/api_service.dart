import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

const String baseUrl = 'http://10.0.2.2:8000/api';
// 10.0.2.2 = Android emulator's localhost

class ApiService {
  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final res = await http.post(
        Uri.parse('$baseUrl/auth/login/'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      print('STATUS: ${res.statusCode}');
      print('BODY: ${res.body}');
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('access_token', data['access']);
        await prefs.setString('refresh_token', data['refresh']);
        return data;
      }
      throw Exception('Login failed');
    } catch (e) {
      print('ERROR: $e');
      rethrow;
    }
  }

  static Future<Map<String, dynamic>> getProfile() async {
    final token = await getToken();
    final res = await http.get(
      Uri.parse('$baseUrl/student/profile/'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (res.statusCode == 200) return jsonDecode(res.body);
    throw Exception('Failed to load profile');
  }

  static Future<List<dynamic>> getAssignments() async {
    final token = await getToken();
    final res = await http.get(
      Uri.parse('$baseUrl/student/assignments/'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (res.statusCode == 200) return jsonDecode(res.body);
    throw Exception('Failed to load assignments');
  }

  static Future<List<dynamic>> getAttendanceSummary() async {
    final token = await getToken();
    final res = await http.get(
      Uri.parse('$baseUrl/student/attendance/summary/'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (res.statusCode == 200) return jsonDecode(res.body);
    throw Exception('Failed to load attendance');
  }

  static Future<List<dynamic>> getNotices() async {
    final token = await getToken();
    final res = await http.get(
      Uri.parse('$baseUrl/notices/'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (res.statusCode == 200) return jsonDecode(res.body);
    throw Exception('Failed to load notices');
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}