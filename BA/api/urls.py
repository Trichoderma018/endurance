from django.urls import path
from .views import UserListCreateView, UserDetailView, ExpedientesListCreateView, ExpedientesDetailView, AdminListCreateView, AdminDetailView, StaffListCreateView, StaffDetailView, VisitasListCreateView, VisitasDetailView, proyectoListCreateView, proyectoDetailView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('expedientes/', ExpedientesListCreateView.as_view(), name='expedientes-list-create'),
    path('expedientes/<int:pk>/', ExpedientesDetailView.as_view(), name='expedientes-detail'),
    path('admin/', AdminListCreateView.as_view(), name='admin-list-create'),
    path('admin/<int:pk>/', AdminDetailView.as_view(), name='admin-detail'),
    path('staff/', StaffListCreateView.as_view(), name='staff-list-create'),
    path('staff/<int:pk>/', StaffDetailView.as_view(), name='staff-detail'),
    path('visitas/', VisitasListCreateView.as_view(), name='visitas-list-create'),
    path('visitas/<int:pk>/', VisitasDetailView.as_view(), name='visitas-detail'),
    path('proyecto/', proyectoListCreateView.as_view(), name='proyecto-list-create'),
    path('proyecto/<int:pk>/', proyectoDetailView.as_view(), name='proyecto-detail'),
]