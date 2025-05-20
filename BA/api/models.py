from django.db import models

class User(models.Model):
    nombreCompleto = models.CharField(max_length=150, unique=True)
    apellido = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.nombreCompleto
    
class Expedientes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nombreCompleto = models.CharField(max_length=150)
    rol = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    imagen = models.ImageField(upload_to='expedientes/', blank=True, null=True)
    sede = models.CharField(max_length=150)
    cometario1 = models.TextField(blank=True, null=True)
    cometario2 = models.TextField(blank=True, null=True)
    cometario3 = models.TextField(blank=True, null=True)
    fechaExpediente = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombreCompleto
    
class visitas(models.Model):
    nombreCompleto = models.CharField(max_length=150)
    rol = models.CharField(max_length=30)
    institucion = models.CharField(max_length=150)
    anoAcademico = models.CharField(max_length=30)
    adecuacion = models.CharField(max_length=30)
    tipoAdecuacion = models.CharField(max_length=30)
    beca = models.CharField(max_length=30)
    montoBeca = models.CharField(max_length=30)
    institucionBeca = models.CharField(max_length=30)
    comentario = models.TextField(blank=True, null=True)
    adjuntoNotas = models.FileField(upload_to='notas/', blank=True, null=True)
