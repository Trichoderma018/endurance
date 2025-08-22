# Endurance

- Lista de versiones
argon2-cffi                   23.1.0
argon2-cffi-bindings          21.2.0
asgiref                       3.8.1
cffi                          1.17.1
colorama                      0.4.6
Django                        5.2
django-cors-headers           4.7.0
djangorestframework           3.16.0
djangorestframework_simplejwt 5.5.0
iniconfig                     2.1.0
mysqlclient                   2.2.7
packaging                     24.2
pip                           25.2
pluggy                        1.5.0
pycparser                     2.22
pyenv-win                     3.1.1
PyJWT                         2.9.0
pytest                        8.3.5
sqlparse                      0.5.3
tzdata                        2025.2

Para este proyecto es necesario hacer la instalación de las siguientes librerias

Frontend
- aws-sdk | npm install aws-sdk
- react-router-dom | npm install react-router-dom   
- jspdf | npm install jspdf jspdf-autotable
- jspdf-autotable | npm install jspdf jspdf-autotable
- npm install jspdf html2canvas
- npm install --save react-apexcharts apexcharts

Backend
- rest_framework | pip install djangorestframework
- corsheaders | pip install django-cors-headers
- Django | py -m pip install Django = 5.1.2
- mysqlclient | pip install mysqlclient   
- jwt | pip install djangorestframework-simplejwt
- argon2 | pip install django[argon2]

Para que el proyecto se ejecute debes instalar todos las librerias y paquetes que se encuentran en este archivo

Debes ejecutar el comando: npm i, para instalar paquetes y dependencias del front-end

Si deseas levantar el servidor front-end debes ejecutar este comando:
npm run server

Si deseas levantar el servidor back-end debes ejecutar este comando:
python manage.py runserver

Para crear la migracion para la base de datos se debem hacer los siguientes comandos:
python manage.py makemigrations
python manage.py migrate

