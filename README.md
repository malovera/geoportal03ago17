# Geoportal Ica

Repositorio para el desarrollo para el Geoportal Ica.

Para que todos tengamos un setup similar, es necesario:

## Comandos Iniciales

En el disco de elección, en este caso ```"C:"``` crear el directorio ```C:\geoportal``` y acceder a el mediante ```cmd```:
```
cd C:\geoportal
```

Clonar el repositorio:
```
git clone https://gitlab.com/jvillafuerte/geoportal.git
```

Crear el entorno virtual:
```
virtualenv geoportal-env
```

## Comandos para el desarrollo

Para levantar el entorno virtual:
```
geoportal-env\Scripts\activate.bat
```

Una vez activado el entorno virtual, deberá aparecer en el prompt lo siguiente:
```
(geoportal-env) C:\geoportal
```

Para instalar los requerimientos mínimos, se debe acceder al directorio ```geoportal```:
```
cd C:\geoportal\geoportal
pip install -r requirements.txt
```

Para levantar el servidor de desarrollo, debes estar ubicado en la carpeta del proyecto Django:
```
cd C:\geoportal\geoportal\geoportalica
python manage.py runserver
```

## Si se desea desactivar el entorno virtual:
```
cd C:\geoportal
geoportal-env\Scripts\deactivate.bat
```