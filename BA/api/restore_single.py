import os
from django.core.management.base import BaseCommand
from django.core import serializers
#Para ejecutar el restaurar python manage.py restore_single --file backups/backup_20250822_153012.json

BACKUP_DIR = 'backups'
BACKUP_FILE = 'backup_latest.json'  # puedes cambiarlo por un nombre específico

class Command(BaseCommand):
    help = 'Restaura todos los datos desde un archivo JSON único'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            help='Ruta al archivo de backup (por defecto usa backup_latest.json)'
        )

    def handle(self, *args, **kwargs):
        file = kwargs['file'] or os.path.join(BACKUP_DIR, BACKUP_FILE)

        if not os.path.exists(file):
            self.stdout.write(self.style.ERROR(f'No existe el archivo: {file}'))
            return

        with open(file, 'r') as f:
            data = f.read()

        for obj in serializers.deserialize('json', data):
            obj.save()

        self.stdout.write(self.style.SUCCESS(f'Datos restaurados desde: {file}'))