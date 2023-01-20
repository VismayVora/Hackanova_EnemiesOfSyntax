from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from django.conf.urls import include

# router = DefaultRouter()
# router.register(r'checkins', views.CheckInAPI)
# router.register(r'guardians', views.GuardianDetails)

urlpatterns = [
    # url('', include(router.urls)),
    path('nearbysearch',views.nearby_search,name="Nearby Search"),
    path('location',views.LocationAPI.as_view(),name="location"),
    path('audit-form',views.AuditFormAPI.as_view(),name="audit-form"),
    path('tourpackage',views.TourPackageAPI.as_view(),name="tourpackage"),
    # path('alert',views.sos_alert,name="sos_alert"),
    # path('share-location',views.sharelocation,name="share-location"),
    # path('fake-call',views.fakecall,name="fake-call"),
]

