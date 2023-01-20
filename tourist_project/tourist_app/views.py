import datetime,json
from django.contrib.auth import authenticate,login
from django.conf import settings


from .models import Location, AuditForm

from .serializers import LocationSerializer, AuditFormSerializer
from rest_framework import viewsets,permissions
from . import custom_permissions
from rest_framework.decorators import action,api_view, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.response import Response 

# from .whatsapp import send_message
from django.http import JsonResponse
# from twilio.rest import Client
import requests

# def send_text(number,msg):
#     client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN )
#     message = client.messages.create(body= f'{msg}',
#         to =str(number),
#         from_ ='+12346574691')
#     return('success')

# def call_me(number):
# 	client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN )
# 	call = client.calls.create(
#                         twiml='<Response><Say>Ahoy, World!</Say></Response>',
#                         to=str(number),
#                         from_='+12346574691'
#                     )
# 	return('success')

# @api_view(('GET',))
# def news(self):
#     url = ('https://newsapi.org/v2/everything?'
#     'q=women+safety&'
#     'searchln=description'
#     f'from={datetime.date.today()}&'
#     'sortBy=popularity&'
#     'apiKey=c476157b8a084a4b8bdf8a1a8dd2a7a7')
#     response = requests.get(url)
#     return Response(response.json())

class LocationAPI(GenericAPIView):
	serializer_class = LocationSerializer
	permission_classes = [custom_permissions.IsUserOrReadOnly]
	queryset = Location.objects.all()

	def post(self,request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
		return Response(serializer.data)

class AuditFormAPI(GenericAPIView):
	serializer_class = AuditFormSerializer
	permission_classes = [custom_permissions.IsUserOrReadOnly]
	queryset = AuditForm.objects.all()

	def post(self,request):
		score = 0
		score += int(request.data['lighting'])
		score += int(request.data['openness'])
		score += int(request.data['visibility'])
		score += int(request.data['people'])
		score += int(request.data['security'])
		score += int(request.data['walk_path'])
		score += int(request.data['public_transport'])
		score += int(request.data['public_usage'])
		score += int(request.data['feeling'])
		score /= 9
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save(author=request.user,score = score)
			loc_id = request.data['location']
			location = Location.objects.get(id = loc_id)
			location.get_score()
			location.save()
			# request.user.points += 50
			# request.user.star()
			request.user.save()
		return Response(serializer.data)

# @api_view(('POST',))
# @permission_classes([permissions.IsAuthenticated])
# def sharelocation(self):
# 	location_link = self.data['link']
# 	guardians = Guardian.objects.filter(owner=self.user)#, favourite = True)
# 	for guardian in guardians:
# 		msg = f"Hello {guardian.name}, {guardian.owner} has started location sharing with you. Click on this link to track the location: {location_link}"
# 		send_message(self,guardian,msg)
# 		k = send_text(guardian.phone_no,msg)
	
# 	return Response({'success':"The message has been sent to the favourite guardians!"})

# @api_view(('POST',))
# @permission_classes([permissions.IsAuthenticated])
# def sos_alert(self):
# 	location_link = self.data['link']
# 	guardians = Guardian.objects.filter(owner=self.user)
# 	for guardian in guardians:
# 		msg = f"Hello {guardian.name}, {guardian.owner} is in trouble and has raised an SOS!!. Click on this link to track the location: {location_link}"
# 		send_message(self,guardian,msg)
# 		k = send_text(guardian.phone_no,msg)
# 	return Response({'success':"The message has been sent to guardians!"})

# @api_view(('GET',))
# @permission_classes([permissions.IsAuthenticated])
# def fakecall(self):
# 	user = self.user
# 	call = call_me(user.phone_no)
# 	return Response({'success':"Fake call has been generated!"})

def mapmyindia_token():
	#Retrieving token
	url = "https://outpost.mapmyindia.com/api/security/oauth/token"
	payload='grant_type=client_credentials&client_id=33OkryzDZsJeY7NmLDf79EdHohcvof1fARN7VL4xLwBl9sUpkxXvLEEleykR3i3E_y5gSeOiq-iIEIWkJ0FgKQ%3D%3D&client_secret=lrFxI-iSEg98iV1v-omJB3PmZgXX5UShNtRH_bPW3DHLZGKF9nrcoJZcFgk1Rj2jtxC_AhLTwQLuOGcQ1J-iTbTDTrQNYXh0'
	headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
		}
	
	response = requests.request("POST", url, headers=headers, data=payload)
	return json.loads(response.text)
		
@api_view(('POST',))
def nearby_search(request):
	access_token = mapmyindia_token()['access_token']
	keywords = request.data['keywords']
	latitude = request.data['latitude']
	longitude = request.data['longitude']
	url = f"https://atlas.mapmyindia.com/api/places/nearby/json?keywords={keywords} &refLocation={latitude}, {longitude}"
	payload={}
	headers ={
		'Authorization': 'bearer ' + access_token
		}
	response = requests.request("GET", url, headers=headers, data=payload)
	return Response(response.json())


# class CheckInAPI(viewsets.ModelViewSet):
# 	serializer_class = CheckInSerializer
# 	permission_classes = [permissions.IsAuthenticated]
# 	queryset = CheckIn.objects.all()

# 	def get_queryset(self,phone_no):
# 		return CheckIn.objects.filter(logger__phone_no=phone_no)
	
# 	def perform_create(self,serializer):
# 		serializer.save(logger = self.request.user)
	
	#def update(self, request, *args, **kwargs):
		#kwargs['partial'] = True
		#return super().update(request, *args, **kwargs)