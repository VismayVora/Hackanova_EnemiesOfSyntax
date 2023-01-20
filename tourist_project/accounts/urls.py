from django.urls import path
from . import views
from django.conf.urls import include

urlpatterns = [
    path('user_register/', views.UserRegisterAPI.as_view(), name = 'User Registration'),
    path('tour_operator_register/', views.TourOperatorRegisterAPI.as_view(), name = 'Tour Operator Registration'),
    path('login/', views.LoginAPI.as_view(), name = 'login'),

]