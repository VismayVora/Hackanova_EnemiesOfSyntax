
from rest_framework import serializers
from .models import Location, AuditForm, TourPackage

class LocationSerializer(serializers.ModelSerializer):

	class Meta:
		model = Location
		fields = '__all__'

class AuditFormSerializer(serializers.ModelSerializer):
	author = serializers.ReadOnlyField(source='author.name')

	class Meta:
		model = AuditForm
		fields = '__all__'

class TourPackageSerializer(serializers.ModelSerializer):
	tour_operator = serializers.ReadOnlyField(source='tour_operator.name')

	class Meta:
		model = TourPackage
		fields = '__all__'