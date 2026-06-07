from django.db import models
from students.models import Student

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
    ]

    student   = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    subject   = models.CharField(max_length=100)
    date      = models.DateField()
    status    = models.CharField(max_length=10, choices=STATUS_CHOICES)
    marked_by = models.CharField(max_length=100)  # faculty name

    class Meta:
        unique_together = ['student', 'subject', 'date']  # no duplicate entry

    def __str__(self):
        return f"{self.student.roll_no} - {self.subject} - {self.date} - {self.status}"