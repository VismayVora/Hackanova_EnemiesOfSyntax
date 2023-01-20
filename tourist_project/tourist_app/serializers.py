
from rest_framework import serializers
from .models import Location, AuditForm

class LocationSerializer(serializers.ModelSerializer):

	class Meta:
		model = Location
		fields = '__all__'

class AuditFormSerializer(serializers.ModelSerializer):
	author = serializers.ReadOnlyField(source='author.name')

	class Meta:
		model = AuditForm
		fields = '__all__'