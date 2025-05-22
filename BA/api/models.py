from django.db import models
from django.contrib.auth.models import User 

class Admin(models.Model):
    nombreCompleto = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.nombreCompleto
    
class Staff(models.Model):
    nombreCompleto = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    rol = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    imagen = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.nombreCompleto
    
class Atletas(models.Model):
    nombreCompleto = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    rol = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    imagen = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.nombreCompleto

class Expedientes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nombreCompleto = models.CharField(max_length=150)
    rol = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    imagen = models.CharField(max_length=150, blank=True, null=True)
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
    #Notas
    institucion = models.CharField(max_length=150)
    anoAcademico = models.CharField(max_length=30)
    adecuacion = models.CharField(max_length=30)
    tipoAdecuacion = models.CharField(max_length=30)
    beca = models.CharField(max_length=30)
    montoBeca = models.CharField(max_length=30)
    institucionBeca = models.CharField(max_length=30)
    comentario = models.TextField(blank=True, null=True)
    adjuntoNotas = models.FileField(upload_to='notas/', blank=True, null=True)
    #Datos Personales
    fechaNacimiento = models.DateField()
    Edad = models.CharField(max_length=30)
    cedula = models.CharField(max_length=30)
    telefono1 = models.CharField(max_length=30)
    telefono2 = models.CharField(max_length=30)
    lugarResidencia = models.CharField(max_length=30)
    #Datos Tecnicos
    lesiones = models.CharField(max_length=400)
    enferemedades = models.CharField(max_length=400)
    trataminetos = models.CharField(max_length=400)
    atencionMedica = models.CharField(max_length=400)
    drogas = models.CharField(max_length=400)
    disponibilidad = models.CharField(max_length=400)
    #Vivienda
    casa = models.CharField(max_length=400)
    montoCasa = models.CharField(max_length=400)
    especificaciones = models.TextField(blank=True, null=True)
    comentario4 = models.TextField(blank=True, null=True)
    #Trabajo
    Trabaja = models.CharField(max_length=400)
    Empresa = models.CharField(max_length=400)
    salario = models.CharField(max_length=400)
    comentario5 = models.TextField(blank=True, null=True)
    #Familia
    nombre = models.CharField(max_length=400)
    edad2 = models.CharField(max_length=400)
    parentesco = models.CharField(max_length=400)
    ocupacion = models.CharField(max_length=400)
    ingresoMensual = models.CharField(max_length=400)
    lugarTrabajo = models.CharField(max_length=400)
    #Ingresos y gastos
    ingresos = models.CharField(max_length=400)
    salario2 = models.CharField(max_length=400)
    pension = models.CharField(max_length=400)
    beca2 = models.CharField(max_length=400)
    gastos = models.CharField(max_length=400)
    comida = models.CharField(max_length=400)
    agua = models.CharField(max_length=400)
    luz = models.CharField(max_length=400)
    internetCable = models.CharField(max_length=400)
    celular = models.CharField(max_length=400)
    viaticos = models.CharField(max_length=400)
    salud = models.CharField(max_length=400)
    deudas = models.CharField(max_length=400)


