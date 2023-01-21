from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=255,blank = True)
    description = models.TextField(max_length=255,null=True,blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    safety_score = models.FloatField(default = 0)
    
    # def __str__(self):
    #     # return f'{self.latitude,self.longitude}'
    #     return f'{self.name}'
    
    def get_score(self):
        reviews = AuditForm.objects.filter(location = self)
        count = 1
        for review in reviews:
            self.safety_score += review.score
            count += 1
            self.safety_score /= count
        return self.safety_score

class AuditForm(models.Model):
	author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='author', on_delete=models.CASCADE)
	location = models.ForeignKey(Location,on_delete=models.CASCADE)
	lighting = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	openness = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	visibility = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	people = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	security = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	walk_path = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	public_transport = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	public_usage = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	feeling = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
	score = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])

	def __str__(self):
		return f'{self.location} - {self.score}'

class TourPackage(models.Model):
    price = models.DecimalField(max_digits=7,decimal_places=2)
    package_name = models.CharField(max_length=80)
    location = models.ForeignKey(Location,on_delete=models.CASCADE)
    image = models.ImageField(null=True,blank=True)
    description = models.TextField(max_length=400,null=True, blank=True)
    tour_operator = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tour_operator', on_delete=models.CASCADE)
