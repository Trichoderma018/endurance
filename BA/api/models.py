from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    sede = models.CharField(max_length=150, blank=True, null=True)

class Admin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)  # Relación con CustomUser
    nombreCompleto = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    # Remover password - se maneja en CustomUser

    def __str__(self):
        return self.nombreCompleto
    
class Staff(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)  # Relación con CustomUser
    nombreCompleto = models.CharField(max_length=150)
    email = models.EmailField(unique=True)  # Eliminar duplicado
    cargo = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    departamento = models.CharField(max_length=30)
    # Remover password - se maneja en CustomUser

    def __str__(self):
        return self.nombreCompleto
    

class Expedientes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='expedientes')
    rol = models.CharField(max_length=30)
    activo = models.BooleanField(default=True)
    imagen = models.CharField(max_length=150, blank=True, null=True)
    genero = models.CharField(max_length=10)
    sede = models.CharField(max_length=150)
    comentario1 = models.TextField(blank=True, null=True) 
    comentario2 = models.TextField(blank=True, null=True)  
    comentario3 = models.TextField(blank=True, null=True)  
    fechaExpediente = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Expediente de {self.user.username}" 
    
    class Meta:
        verbose_name_plural = "Expedientes"

class Visitas(models.Model):  # Cambiar nombre a PascalCase
    expediente = models.ForeignKey(Expedientes, on_delete=models.CASCADE, related_name='visitas')  # Nueva relación
    nombreCompleto = models.CharField(max_length=150)
    rol = models.CharField(max_length=30)
    
    # Notas
    institucion = models.CharField(max_length=150)
    anoAcademico = models.CharField(max_length=4)
    adecuacion = models.CharField(max_length=40)
    tipoAdecuacion = models.CharField(max_length=80)
    beca = models.CharField(max_length=10)
    montoBeca = models.IntegerField(blank=True, null=True, default=0)
    institucionBeca = models.CharField(max_length=80)
    comentario = models.TextField(max_length=600, blank=True, null=True)
    adjuntoNotas = models.CharField(max_length=150, blank=True, null=True)
    
    # Datos Personales
    fechaNacimiento = models.DateField()
    edad = models.CharField(max_length=3)  # Cambiar nombre
    cedula = models.CharField(max_length=20)
    telefono1 = models.CharField(max_length=30)
    telefono2 = models.CharField(max_length=30, blank=True, null=True)
    lugarResidencia = models.CharField(max_length=300)
    
    # Datos Técnicos
    lesiones = models.CharField(max_length=300, blank=True, null=True)
    enfermedades = models.CharField(max_length=300, blank=True, null=True)  # Corregir typo
    tratamientos = models.CharField(max_length=300, blank=True, null=True)  # Corregir typo
    atencionMedica = models.CharField(max_length=400, blank=True, null=True)
    drogas = models.CharField(max_length=200, blank=True, null=True)
    disponibilidad = models.CharField(max_length=400, blank=True, null=True)
    
    # Vivienda
    casa = models.CharField(max_length=100)
    montoCasa = models.IntegerField(blank=True, null=True, default=0)
    especificaciones = models.TextField(blank=True, null=True)
    comentario4 = models.TextField(blank=True, null=True)
    
    # Trabajo
    trabaja = models.CharField(max_length=100)  # Cambiar nombre
    empresa = models.CharField(max_length=100, blank=True, null=True)  # Cambiar nombre
    salario = models.IntegerField(blank=True, null=True, default=0)
    comentario5 = models.TextField(blank=True, null=True)
    
    # Familia
    nombreFamiliar = models.CharField(max_length=200, blank=True, null=True)  # Cambiar nombre
    edadFamiliar = models.CharField(max_length=4, blank=True, null=True)  # Cambiar nombre
    parentesco = models.CharField(max_length=100, blank=True, null=True)
    ocupacion = models.CharField(max_length=400, blank=True, null=True)
    ingresoMensual = models.IntegerField(blank=True, null=True, default=0)
    lugarTrabajo = models.CharField(max_length=400, blank=True, null=True)
    
    # Ingresos y gastos
    ingresos = models.IntegerField(blank=True, null=True, default=0)
    salario2 = models.IntegerField(blank=True, null=True, default=0)
    pension = models.IntegerField(blank=True, null=True, default=0)
    beca2 = models.IntegerField(blank=True, null=True, default=0)
    gastos = models.IntegerField(blank=True, null=True, default=0)
    comida = models.IntegerField(blank=True, null=True, default=0)
    agua = models.IntegerField(blank=True, null=True, default=0)
    luz = models.IntegerField(blank=True, null=True, default=0)
    internetCable = models.IntegerField(blank=True, null=True, default=0)
    celular = models.IntegerField(blank=True, null=True, default=0)
    viaticos = models.IntegerField(blank=True, null=True, default=0)
    salud = models.IntegerField(blank=True, null=True, default=0)
    deudas = models.IntegerField(blank=True, null=True, default=0)
    
    fechaVisita = models.DateTimeField(auto_now_add=True)  # Nueva fecha de visita
    
    def __str__(self):
        return f"Visita de {self.nombreCompleto} - {self.fechaVisita.date()}"
    
    class Meta:
        verbose_name_plural = "Visitas"

class Proyecto(models.Model):
    nombreProyecto = models.CharField(max_length=150)
    # Cambiar de CharField a ManyToMany para múltiples usuarios
    usuarios = models.ManyToManyField(CustomUser, related_name='proyectos')
    objetivo = models.TextField()
    imagen = models.CharField(max_length=150, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fechaInicio = models.DateField()
    fechaFin = models.DateField()
    activo = models.BooleanField(default=True)  # Campo adicional útil
    
    def __str__(self):
        return self.nombreProyecto
    
    @property
    def lista_usuarios(self):
        """Retorna una lista de nombres de usuarios del proyecto"""
        return ", ".join([user.username for user in self.usuarios.all()])

# Modelo adicional sugerido para mejor organización
class FamiliarExpediente(models.Model):
    """Modelo separado para manejar múltiples familiares por expediente"""
    expediente = models.ForeignKey(Expedientes, on_delete=models.CASCADE, related_name='familiares')
    nombre = models.CharField(max_length=200)
    edad = models.CharField(max_length=4)
    parentesco = models.CharField(max_length=100)
    ocupacion = models.CharField(max_length=400, blank=True, null=True)
    ingresoMensual = models.IntegerField(blank=True, null=True, default=0)
    lugarTrabajo = models.CharField(max_length=400, blank=True, null=True)
    
    def __str__(self):
        return f"{self.nombre} - {self.parentesco}"
    
    class Meta:
        verbose_name_plural = "Familiares de Expedientes"