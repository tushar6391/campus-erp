from django.db import models
from faculty.models import Faculty

class Timetable(models.Model):
    DAY_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
    ]

    department = models.CharField(max_length=100)
    year       = models.IntegerField()
    day        = models.CharField(max_length=10, choices=DAY_CHOICES)
    subject    = models.CharField(max_length=100)
    time_slot  = models.CharField(max_length=50)  # e.g. "9:00 AM - 10:00 AM"
    faculty    = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True, related_name='timetables')

    class Meta:
        ordering = ['day', 'time_slot']

    def __str__(self):
        return f"{self.department} Y{self.year} - {self.day} - {self.subject}"