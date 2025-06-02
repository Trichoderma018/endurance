from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import CustomUser, Admin, Staff, Expedientes, visitas
from .serializers import UserSerializer, AdminSerializer, StaffSerializer, ExpedientesSerializer, VisitasSerializer
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
    serializer_class = UserSerializer

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
    queryset = visitas.objects.all()
    serializer_class = VisitasSerializer

class VisitasDetailView(RetrieveUpdateDestroyAPIView):
    # permission_classes = [ IsAuthenticated]
    queryset = visitas.objects.all()
    serializer_class = VisitasSerializer