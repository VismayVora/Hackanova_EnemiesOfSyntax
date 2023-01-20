from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import *
from rest_framework.exceptions import ValidationError
import re
 
email_pattern = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

# def isValidAadharNumber(str):

#     regex = ("^[2-9]{1}[0-9]{3}\\" +
#              "s[0-9]{4}\\s[0-9]{4}$")

#     p = re.compile(regex)

#     if (str == None):
#         return False
 
#     if(re.search(p, str)):
#         return True
#     else:
#         return False

class UserRegisterSerializer(serializers.ModelSerializer):
    password= serializers.CharField(max_length = 16, min_length = 8, write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone_no', 'password']

    # To validate data received
    def validate(self, attrs):
        email = attrs.get('email', ' ')
        password = attrs.get('password')
        if not email_pattern.match(email):
            raise serializers.ValidationError('Please enter a valid email!')
        return attrs

    # To create a new user
    def create(self, validated_data):
        validated_data['is_active'] = False
        validated_data['is_user'] = True
        return User.objects.create_user(**validated_data)    

class LoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=32,min_length=8,write_only = True)
    
    class Meta:
        model = User
        fields = ['email','password']

class TourOperatorRegisterSerializer(serializers.ModelSerializer):
    password= serializers.CharField(max_length = 16, min_length = 8, write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone_no', 'password']

    # To validate data received
    def validate(self, attrs):
        email = attrs.get('email', ' ')
        password = attrs.get('password')
        if not email_pattern.match(email):
            raise serializers.ValidationError('Please enter a valid email!')
        return attrs

    # To create a contractor
    def create(self, validated_data):
        validated_data['is_active'] = False
        validated_data['is_tour_operator'] = True
        return User.objects.create_user(**validated_data)