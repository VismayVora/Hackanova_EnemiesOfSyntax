from django.contrib import admin
from .models import Location, AuditForm

# Register your models here.
admin.site.register(Location)
admin.site.register(AuditForm)