from django.contrib import admin
from .models import Location, AuditForm, TourPackage

# Register your models here.
admin.site.register(Location)
admin.site.register(AuditForm)
admin.site.register(TourPackage)