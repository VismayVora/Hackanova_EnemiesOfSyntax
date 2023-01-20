from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.
class UserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'phone_no','name','is_staff','is_active','is_user','is_tour_operator','website_link']
    list_filter = ['email', 'phone_no','name','is_staff','is_active','is_user','is_tour_operator','website_link']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name','phone_no',)}),
        ('Permissions', {'fields': ('is_active','is_staff','is_user','is_tour_operator','is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide,'),
            'fields': ('email', 'password1', 'password2', 'phone_no','name','is_staff','is_active','is_user','is_tour_operator'),
        }),
    )

    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
