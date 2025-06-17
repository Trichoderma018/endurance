from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import CustomUser, Admin, Staff, Expedientes, Visitas, Proyecto, ProyectoUsuarios
from .serializers import UserSerializer, AdminSerializer, StaffSerializer, ExpedientesSerializer, VisitasSerializer,UsuarioEditarSerializer, proyectoSerializer, ProyectoUsuariosSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Permisos

#Vistas de los modelos creados por Django


# Modelo usuario
class UserListCreateView(ListCreateAPIView):
    # permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UsuarioEditarSerializer

class AdminListCreateView(ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class AdminDetailView(RetrieveUpdateDestroyAPIView):
    
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class StaffListCreateView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class StaffDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class ExpedientesListCreateView(ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Expedientes.objects.all()
    serializer_class = ExpedientesSerializer

class ExpedientesDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = Expedientes.objects.all()
    serializer_class = ExpedientesSerializer

class VisitasListCreateView(ListCreateAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = Visitas.objects.all()
    serializer_class = VisitasSerializer

class VisitasDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = Visitas.objects.all()
    serializer_class = VisitasSerializer

class proyectoListCreateView(ListCreateAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = Proyecto.objects.all()
    serializer_class = proyectoSerializer

class proyectoDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = Proyecto.objects.all()
    serializer_class = proyectoSerializer

class ProyectoUsuariosListCreateView(ListCreateAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = ProyectoUsuarios.objects.all()
    serializer_class = ProyectoUsuariosSerializer

class ProyectoUsuariosDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = ProyectoUsuarios.objects.all()
    serializer_class = ProyectoUsuariosSerializer