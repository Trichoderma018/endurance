from django.contrib.auth.models import User, Group
from .models import Admin, Staff, Expedientes, visitas, CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})
    email = serializers.CharField(required=False, allow_blank=True)
    sede = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = CustomUser
        fields = ['password', 'password_confirm', 'username', 'email', 'sede']
        extra_kwargs = {

            'email': {'required': True},
            'sede': {'required': False},
        }
        
    def validate_username(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("El nombre de usuario debe tener al menos 3 caracteres.")

        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso.")
        return value
    
    def validate_email(self, value):
        if not '@' in value:
            raise serializers.ValidationError("El correo electrónico no es válido.")

        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está en uso.")
        return value


    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres.")
        return value

    def create(self, validated_data):
        # Eliminar password_confirm ya que no es un campo del modelo User
        validated_data.pop('password_confirm')
        
        # Guardar la contraseña para usarla después
        password = validated_data.pop('password')

        
        # Crear el usuario sin la contraseña
        user = CustomUser.objects.create(**validated_data)
        
        # Establecer la contraseña con el método seguro que aplica el hashing
        user.set_password(password)

        user.save()
        
        return user

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class ExpedientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expedientes
        fields = '__all__'

class VisitasSerializer(serializers.ModelSerializer):
    class Meta:
        model = visitas
        fields = '__all__'