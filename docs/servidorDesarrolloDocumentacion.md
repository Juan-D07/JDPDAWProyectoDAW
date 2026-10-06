
### FASE 4: Configuración de Mauina Virtual para Desarrollo Web

Clonar la Maquina Virtual Limpia 

#### 1. Comprobación

```bash
# Nombre de maquina
hostname

# Ip de la maquina
ip a
```

##### Cambio de nombre de la Maquina
```bash


# Cambio de nombre sin persistencia
hostnamectl set-hostname `jdp-used`

# Cambio de nombre con persistencia
sudo nano /etc/hosts
# remplaza el nombre viejo (jdp-limpia) por el nuevo nombre (jdp-used)

```

reinicia la maquina

#### 2. Instalacion y Configuración de Apache HTTP

```bash
sudo apt update

sudo apt install apache2 
```

##### Configurar Apache HTTP 
```bash
# Activar el módulo SSL
sudo a2enmod ssl

# Activar el sitio por defecto con HTTPS
sudo a2ensite default-ssl

# Reiniciar Apache para aplicar los cambios
sudo systemctl restart apache2

# Permitir tráfico HTTP en el cortafuegos
sudo ufw allow http
```

#### 3. Configurar Usuarios

##### Usuario Operador Web
El usuario operador web gestiona el contenido del servidor web con permisos limitados a `/var/www/html`.

> - [X] **operadorweb/paso** - Gestión de contenido web

**Características:**
- Directorio home: `/var/www/html`
- Grupo primario: `www-data`
- Shell: `/bin/bash`
- Permisos: rwx en `/var/www/html`

#### Creación del Usuario Operador Web
```bash
# Crear usuario operador web
sudo useradd -M -d /var/www/html -g www-data -s /bin/bash operadorweb

# Establecer contraseña
sudo passwd operadorweb
```

**Explicación:**
- `-M`: No crear directorio home automáticamente
- `-d /var/www/html`: Directorio home existente
- `-g www-data`: Grupo primario
- `-s /bin/bash`: Shell bash

#### Configurar Propiedad y Permisos
```bash
# Cambiar propietario y grupo
sudo chown -R operadorweb:www-data /var/www/html

# Establecer permisos
sudo chmod -R 775 /var/www/html
```

**Explicación de permisos 775:**
- **7** (Propietario): rwx
- **7** (Grupo): rwx
- **5** (Otros): r-x

**Justificación:**
- `operadorweb` puede crear, modificar y eliminar archivos
- Grupo `www-data` (Apache) puede leer, ejecutar y escribir si necesario
- Otros solo lectura

#### Verificación
```bash
# Ver información
id operadorweb

# Verificar propiedad
ls -la /var/www/

# Verificar permisos
ls -ld /var/www/html
```

**Salida esperada:**
```
drwxrwxr-x 2 operadorweb www-data 4096 nov 30 10:00 /var/www/html

```

#### 4. Instalacion y Configuración de PHP-FPM
```bash

sudo apt update

# Instalar php8.5-fpm
sudo apt install php8.5-fpm

```
##### Configurar Apache y PHP-FPM 
```bash

# Configurar Apache2 con php8.5-fpm
sudo a2enmod proxy_fcgi setenvif

# Reiniciar php8.5-fpm
sudo systemctl restart php8.5-fpm

# Activamos el servicio
sudo a2enconf php8.5-fpm

# Reiniciar servicios
sudo systemctl restart php8.5-fpm

sudo systemctl restart apache2

```

##### Configurar para Desarrollo 

Usar `nano /etc/php/8.5/fpm/php-fpm` y cambiar los siguientes parametros para un mejor desarrollo

display_errors = On
error_reporting = E_ALL
display_startup_errors = On
file-uploads = On
allow-url_fopen = On
memory_limit = 256M
upload_max_filesize = 100M
max_execution_time = 360
date.timezone = Europe/Madrid


#### 5. Comprobar el Estado de los Servicios
```bash
# Comprobar SSH
sudo systemctl status ssh

# Comprobar Firewall
sudo systemctl status ufw

# Comprobar Apache (HTTP/HTTPS)
sudo systemctl status apache2

# Comprobar PHP-FPM
sudo systemctl status php5-fpm

```