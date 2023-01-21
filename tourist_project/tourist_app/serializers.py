
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
	location = LocationSerializer(read_only=True)

	class Meta:
		model = TourPackage
		fields = (
	  'id',
      'price',
      'package_name',
      'location',
      'image',
	  'description',
	  'tour_operator',
      'location_id',
    )
		extra_kwargs = {
      'location_id': {'source': 'location', 'write_only': True},
    }