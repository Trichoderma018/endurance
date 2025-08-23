import os
from datetime import datetime
from django.core.management.base import BaseCommand
from django.core import serializers
from django.apps import apps
# Para ejecutar el respaldo python manage.py backup_single
BACKUP_DIR = 'backups'

class Command(BaseCommand):
    help = 'Crea un respaldo único en un solo archivo JSON con todos los modelos'

    def handle(self, *args, **kwargs):
        os.makedirs(BACKUP_DIR, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f'{BACKUP_DIR}/backup_{timestamp}.json'

        # Serializar todos los modelos juntos
        all_objects = []
        for model in apps.get_models():
            all_objects.extend(model.objects.all())

        data = serializers.serialize('json', all_objects)

        with open(filename, 'w') as f:
            f.write(data)

        self.stdout.write(self.style.SUCCESS(f'Respaldo único creado: {filename}'))