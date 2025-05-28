from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    sede = models.CharField(max_length=150, blank=True, null=True)

class Admin(models.Model):
    nombreCompleto = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.nombreCompleto
    
class Staff(models.Model):
    nombreCompleto = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    cargo = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    departamento = models.CharField(max_length=30)

    def __str__(self):
        return self.nombreCompleto
    

class Expedientes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rol = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    imagen = models.CharField(max_length=150, blank=True, null=True)
    genero = models.CharField(max_length=10)
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
    anoAcademico = models.CharField(max_length=4)
    adecuacion = models.CharField(max_length=40)
    tipoAdecuacion = models.CharField(max_length=80)
    beca = models.CharField(max_length=10)
    montoBeca = models.CharField(max_length=30)
    institucionBeca = models.CharField(max_length=80)
    comentario = models.TextField(max_length=600, blank=True, null=True)
    adjuntoNotas = models.CharField(max_length=150, blank=True, null=True)
    #Datos Personales
    fechaNacimiento = models.DateField()
    Edad = models.CharField(max_length=3)
    cedula = models.CharField(max_length=20)
    telefono1 = models.CharField(max_length=30)
    telefono2 = models.CharField(max_length=30)
    lugarResidencia = models.CharField(max_length=300)
    #Datos Tecnicos
    lesiones = models.CharField(max_length=300)
    enferemedades = models.CharField(max_length=300)
    trataminetos = models.CharField(max_length=300)
    atencionMedica = models.CharField(max_length=400)
    drogas = models.CharField(max_length=200)
    disponibilidad = models.CharField(max_length=400)
    #Vivienda
    casa = models.CharField(max_length=100)
    montoCasa = models.CharField(max_length=100)
    especificaciones = models.TextField(blank=True, null=True)
    comentario4 = models.TextField(blank=True, null=True)
    #Trabajo
    Trabaja = models.CharField(max_length=100)
    Empresa = models.CharField(max_length=100)
    salario = models.CharField(max_length=200)
    comentario5 = models.TextField(blank=True, null=True)
    #Familia
    nombre = models.CharField(max_length=200)
    edad2 = models.CharField(max_length=4)
    parentesco = models.CharField(max_length=100)
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

class Proyecto(models.Model):
    nombreProyecto = models.CharField(max_length=150)
    integrantes = models.CharField(max_length=150)
    objetivo = models.TextField()
    imagen = models.CharField(max_length=150, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fechaInicio = models.DateField()
    fechaFin = models.DateField()

    def __str__(self):
        return self.nombreProyecto

