from django.contrib.auth.models import User, Group
from .models import Admin, Staff, Expedientes, visitas, CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    class Meta:
        model = CustomUser
        fields = '__all__'
        

    def validate_username(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("El nombre de usuario debe tener al menos 3 caracteres.")

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso.")
        return value
    
    def validate_email(self, value):
        if not '@' in value:
            raise serializers.ValidationError("El correo electrónico no es válido.")

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está en uso.")
        return value

    def validate(self, data):
        # Verificar que las contraseñas coincidan
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden."})
        return data

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
        user = User.objects.create(**validated_data)
        
        # Establecer la contraseña con el método seguro que aplica el hashing
        user.set_password(password)

        cliente_group, created = Group.objects.get_or_create(name='doctor')
        user.groups.add(cliente_group)

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