from django.urls import path
from .views import UserListCreateView, UserDetailView, ExpedientesListCreateView, ExpedientesDetailView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('expedientes/', ExpedientesListCreateView.as_view(), name='expedientes-list-create'),
    path('expedientes/<int:pk>/', ExpedientesDetailView.as_view(), name='expedientes-detail'),
]