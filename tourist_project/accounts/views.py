from django.contrib.auth import authenticate,login

from rest_framework.authtoken.models import Token
from rest_framework import status,permissions,viewsets

from .models import *
from .serializers import *

from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import action,api_view
from rest_framework import generics

from django.http import JsonResponse
# from rest_framework.permissions import AllowAny

#import datetime

# import environ

# env = environ.Env()
# environ.Env.read_env()

# Create your views here.

class UserRegisterAPI(GenericAPIView):
	
	serializer_class = UserRegisterSerializer
	
	def post(self,request,*args,**kwargs):
		data = request.data
		serializer = self.serializer_class(data=data)
		serializer.is_valid(raise_exception = True)
		user = serializer.save()
		if not user.is_active:
			user.is_active = True
			user.save()
		token = Token.objects.create(user=user)
		
		return Response({'token' : token.key,'email' : user.email},status = status.HTTP_200_OK)

class TourOperatorRegisterAPI(GenericAPIView):
	
	serializer_class = TourOperatorRegisterSerializer
	
	def post(self,request,*args,**kwargs):
		data = request.data
		serializer = self.serializer_class(data=data)
		serializer.is_valid(raise_exception = True)
		user = serializer.save()
		if not user.is_active:
			user.is_active = True
			user.save()
		token = Token.objects.create(user=user)
		
		return Response({'token' : token.key,'email' : user.email, 'name' : user.name},status = status.HTTP_200_OK)

class LoginAPI(GenericAPIView):
	permission_classes=[permissions.AllowAny]
	serializer_class = LoginSerializer
	
	def post(self,request,*args,**kwargs ):
		email = request.data.get('email',None)
		password = request.data.get('password',None)
		user = authenticate(email = email, password = password)
		if user :
			login(request,user)
			serializer = self.serializer_class(user)
			token = Token.objects.get(user=user)
			return Response({'token' : token.key,'email' : user.email,'name' : user.name, 'is_user': user.is_user, 'is_tour_operator': user.is_tour_operator},status = status.HTTP_200_OK)
		return Response('Invalid Credentials',status = status.HTTP_404_NOT_FOUND)

class ProfileAPI(GenericAPIView):
	permission_classes = [permissions.IsAuthenticated]
	# serializer_class = TourOperatorRegisterSerializer

	def get(self,request):
		user_obj = self.request.user
		if user_obj.is_user == True:
			serializer = TourOperatorRegisterSerializer
		else:
			serializer = UserRegisterSerializer
		profile_details = serializer(user_obj)
		return JsonResponse(profile_details.data, status = status.HTTP_200_OK)
	
	def patch(self, request):
		user_obj = self.request.user
		if user_obj.is_user == True:
			serializer = TourOperatorRegisterSerializer(user_obj, data=request.data, partial=True)
		else:
			serializer = UserRegisterSerializer(user_obj, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(code=200, data=serializer.data)
		return JsonResponse(code=400, data="wrong parameters")

