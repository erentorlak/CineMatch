from django.db import models

class Collection(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    poster_path = models.CharField(max_length=255)
    backdrop_path = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class ProductionCompany(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class ProductionCountry(models.Model):
    iso_3166_1 = models.CharField(max_length=2, primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Language(models.Model):
    iso_639_1 = models.CharField(max_length=2, primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Movie(models.Model):
    adult = models.BooleanField(default=False)
    belongs_to_collection = models.ForeignKey(Collection, on_delete=models.CASCADE, null=True, blank=True)
    budget = models.IntegerField(default=0, null=True)  # Nullable budget field
    genres = models.ManyToManyField(Genre)
    homepage = models.URLField(null=True, blank=True)
    id = models.IntegerField(primary_key=True)
    imdb_id = models.CharField(max_length=255, default='', null=True, blank=True)  # Nullable IMDb ID field
    original_language = models.CharField(max_length=2,null= True)
    original_title = models.CharField(max_length=255,null= True)
    overview = models.TextField(null= True)
    popularity = models.FloatField(default=0.0, null=True)  # Nullable popularity field
    poster_path = models.CharField(max_length=255,null= True)
    production_companies = models.ManyToManyField(ProductionCompany)
    production_countries = models.ManyToManyField(ProductionCountry)
    release_date = models.DateField(null=True)  # Nullable release_date field
    revenue = models.FloatField(default=0.0, null=True)  # Nullable revenue field
    runtime = models.FloatField(default=0.0, null=True)  # Nullable runtime field
    spoken_languages = models.ManyToManyField(Language)
    status = models.CharField(max_length=255, null=True, blank=True)  # Nullable status field
    tagline = models.TextField(null=True, blank=True)
    title = models.CharField(max_length=255)
    video = models.BooleanField(default=False, null=True)  # Nullable video field
    vote_average = models.FloatField(default=0.0, null=True)  # Nullable vote_average field
    vote_count = models.IntegerField(default=0, null=True)  # Nullable vote_count field

    def __str__(self):
        return self.title
