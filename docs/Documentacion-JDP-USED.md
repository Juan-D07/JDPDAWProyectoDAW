# USED – Ubuntu Server
*(Servidor de desarrollo para aplicaciones web basadas en el uso de PHP)*

**Guía de Instalación y Configuración: Ubuntu Server (`JDP-USED`)**

---

## Índice de Contenidos

- [USED – Ubuntu Server](#used--ubuntu-server)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [1. Configuración Inicial](#1-configuración-inicial)
    - [1.1. Preparación de la Máquina Virtual (VirtualBox)](#11-preparación-de-la-máquina-virtual-virtualbox)
    - [1.2. Instalación del Sistema Operativo (Ubuntu Server)](#12-instalación-del-sistema-operativo-ubuntu-server)
    - [1.3. Configuración de Red Definitiva (Netplan: Clase y Casa)](#13-configuración-de-red-definitiva-netplan-clase-y-casa)
    - [1.4. Actualización del Sistema, Zona Horaria, SSH, Firewall y Antivirus](#14-actualización-del-sistema-zona-horaria-ssh-firewall-y-antivirus)
    - [1.5. Comprobación de la Configuración Inicial](#15-comprobación-de-la-configuración-inicial)
  - [2. Cuentas de Administración](#2-cuentas-de-administración)
    - [2.1. Cuentas Administradoras (`miadmin` y `miadmin2`)](#21-cuentas-administradoras-miadmin-y-miadmin2)
    - [2.2. Comprobación de Cuentas y Permisos](#22-comprobación-de-cuentas-y-permisos)
  - [3. Apache](#3-apache)
    - [3.1. Instalación de Apache2](#31-instalación-de-apache2)
    - [3.2. Configuración de HTTP, SSL y Cortafuegos](#32-configuración-de-http-ssl-y-cortafuegos)
      - [Configuracion de Archivo apache.conf](#configuracion-de-archivo-apacheconf)
      - [Configuracion de Codigos de Errores con HTTP](#configuracion-de-codigos-de-errores-con-http)
    - [3.3. Configuracion Apache HTTPS](#33-configuracion-apache-https)
      - [Redireccion HTTP a HTTPS](#redireccion-http-a-https)
      - [Configuracion de Codigos de Errores con HTTPS](#configuracion-de-codigos-de-errores-con-https)
    - [3.4. Comprobación del Servicio Apache](#34-comprobación-del-servicio-apache)
  - [4. PHP](#4-php)
    - [4.1. Instalación de PHP 8.5-FPM](#41-instalación-de-php-85-fpm)
    - [4.2. Integración de PHP-FPM con Apache2](#42-integración-de-php-fpm-con-apache2)
        - [Configurar para Desarrollo](#configurar-para-desarrollo)
    - [4.3. Modulo Xdebug](#43-modulo-xdebug)
    - [4.4. Comprobación del Servicio PHP-FPM](#44-comprobación-del-servicio-php-fpm)
  - [5. MariaDB](#5-mariadb)
    - [5.1. Instalación de MariaDB](#51-instalación-de-mariadb)
    - [5.2. Configuración de MariaDB](#52-configuración-de-mariadb)
      - [Configuración de puerto](#configuración-de-puerto)
      - [Creación de Usuario](#creación-de-usuario)
      - [Instalación Segura](#instalación-segura)
      - [Instalación de Modulo de mysql en PHP](#instalación-de-modulo-de-mysql-en-php)
      - [Abrir Puerto en UFW](#abrir-puerto-en-ufw)
    - [5.3. Comprobación del Servicio MariaDB](#53-comprobación-del-servicio-mariadb)
    - [5.4 Instalación de phpMyAdmin](#54-instalación-de-phpmyadmin)
    - [5.5 Comprobación de phpmyadmin](#55-comprobación-de-phpmyadmin)
  - [6. Cuentas de Desarrollo](#6-cuentas-de-desarrollo)
    - [6.1 Cuentas de Desarrollo (`operadorweb`)](#61-cuentas-de-desarrollo-operadorweb)
    - [6.2 Cuentas de Desarrollo Enjauladas (`enjaulado`)](#62-cuentas-de-desarrollo-enjauladas-enjaulado)
    - [6.3 Comprobacion de Creacion](#63-comprobacion-de-creacion)
  - [7. SSH](#7-ssh)
    - [7.1 Instalacion de SSH](#71-instalacion-de-ssh)
    - [7.2 Mantenimiento de SSH](#72-mantenimiento-de-ssh)
    - [7.2 Ejemplo de Uso de SSH](#73-ejemplo-de-uso-de-ssh)
  - [8. UFW](#8-ufw)
    - [8.1 Instalacion de UFW](#81-instalacion-de-ufw)
    - [8.2 Mantenimiento de UFW](#82-mantenimiento-de-ufw)
    - [8.3 Puertos abiertos](#83-puertos-abiertos)

---

## 1. Configuración Inicial

### 1.1. Preparación de la Máquina Virtual (VirtualBox)

1. Abre **VirtualBox** y haz clic en **Nueva**.
2. **Nombre y Sistema Operativo:**
   - Nombre: `JDP-USLimpia`
   - Carpeta de máquina: *(Tu preferencia)*
   - Tipo: `Linux`
   - Versión: `Ubuntu (64-bit)`
3. **Hardware:**
   - Memoria RAM: `2048 MB` (2 GB)
   - Procesadores (CPU): `2`
4. **Disco Duro:**
   - Selecciona "Crear un disco duro virtual ahora".
   - Formato: `VDI (VirtualBox Disk Image)`.
   - Tamaño: `150GB` (`/`), `350GB` (`/var`) y `4GB` de `swap`.
5. **Configuración de Red (Antes de iniciar):**
   - **En Clase (IES Los Sauces - Dominio de la Junta):** Ve a las **Preferencias** de la máquina creada > **Red** y **deshabilita la tarjeta de red** (desmarcando la casilla "Habilitar adaptador de red") antes de iniciar la máquina. Esto evitará que el instalador intente conectarse a repositorios de internet bloqueados por el DNS de la Junta y provoque fallos en la instalación.
   - **En Casa:** Asegúrate de que la casilla "Habilitar adaptador de red" está marcada y selecciona **Adaptador Puente (Bridged)** para que tome IP de la red de tu casa.

---

### 1.2. Instalación del Sistema Operativo (Ubuntu Server)

Inicia la máquina virtual seleccionando la ISO de **Ubuntu Server** (versión recomendada 26.04 LTS según Heraclio).

1. **Idioma y Teclado:** Selecciona español.
2. **Conexión de Red (Clase):** Como hemos deshabilitado la tarjeta en el paso anterior, omite la configuración de red durante la instalación. Lo configuraremos manualmente luego.
3. **Configuración de Almacenamiento (Particionamiento Manual):**
   - Selecciona **Custom storage layout** (Personalizado).
   - Crea las siguientes particiones en tu disco libre:
     - **Partición 1 (Sistema):** Tamaño `150G`, Formato `ext4`, Punto de montaje `/`.
     - **Partición 2 (Swap):** Tamaño `4G` (RAM $\times 2$), Formato `swap`.
     - **Partición 3 (Datos):** Tamaño `350G`, Formato `ext4`, Punto de montaje `/var`.
4. **Configuración del Perfil (Usuario principal):**
   - Nombre: `Juan`
   - Nombre del servidor: `JDP-USLimpia`
   - Nombre de usuario: `miadmin`
   - Contraseña: `paso`
5. **SSH Setup:** Marca la casilla **"Install OpenSSH server"**.
6. Finaliza la instalación, **apaga la máquina virtual** y retira la ISO.

---

### 1.3. Configuración de Red Definitiva (Netplan: Clase y Casa)

> **¡ATENCIÓN!** Antes de volver a encender la máquina en clase, ve a la configuración de VirtualBox > **Red** y **vuelve a habilitar el adaptador de red** (como **Adaptador Puente**) para poder tener conexión.

Inicia sesión con tu usuario `miadmin` y contraseña `paso`.

```bash
# Cambiar nombre de la máquina en el sistema (si fuera necesario)
sudo hostnamectl set-hostname nuevo-nombre
sudo nano /etc/hosts

# Acceder al directorio para cambiar la configuración de red
cd /etc/netplan

# Visualizar el directorio
ls 00-installer-config.yaml

# Hacer copia de seguridad de la configuración
sudo cp 00-installer-config.yaml 00-installer-config.yaml.backup

# Editar la configuración de red
sudo nano 00-installer-config.yaml
```

- **Parámetros para CLASE (IES Los Sauces):**
  - **Address (IP):** `10.199.9.114/22`
  - **Gateway (Puerta de enlace):** `10.199.8.1`
  - **Name servers (DNS):** `10.151.123.21, 10.151.126.21`

- **Parámetros para CASA:**
  - **Subnet:** `192.168.1.0/24`
  - **Address (IP):** `192.168.1.100/24`
  - **Gateway (Puerta de enlace):** `192.168.1.1`
  - **Name servers (DNS):** `8.8.8.8, 8.8.4.4`

```bash
# Aplicar configuración de red
sudo netplan apply
```

---

### 1.4. Actualización del Sistema, Zona Horaria, SSH, Firewall y Antivirus

```bash
# 1. Actualizar el Sistema Operativo
sudo apt update && sudo apt upgrade -y

# 2. Instalar SSH (si no se instaló en el paso previo)
sudo apt install openssh-server -y

# 3. Activar el SSH en el cortafuegos UFW
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status

# Borrar regla IPv6 en UFW
sudo ufw status numbered
sudo ufw delete 2

# 4. Comprobar y configurar Fecha y Hora
timedatectl status
sudo timedatectl set-timezone Europe/Madrid

# 5. Instalar y actualizar el Antivirus ClamAV
sudo apt update
sudo apt install clamav clamav-daemon -y

# Parar el demonio de actualización para actualizar manualmente
sudo systemctl stop clamav-freshclam
sudo freshclam

# Iniciar y habilitar el servicio de actualización del antivirus
sudo systemctl start clamav-freshclam
sudo systemctl enable clamav-freshclam

# Cambio de nombre de la maquina
sudo hostnamectl set-hostname 'nuevo-nombre'
sudo nano /etc/hosts 
#Cambiar antiguo hostname por con el nuevo
```

---

### 1.5. Comprobación de la Configuración Inicial

*(Usa `q` para salir de la vista de estado de cada servicio).*

```bash
# Verificar el nombre del host (hostname) y sistema
hostnamectl
uname -a

# Verificar la configuración de red y la IP asignada
ip a

# Ver la configuración aplicada en Netplan
cat /etc/netplan/00-installer-config.yaml

# Verificar los discos, particiones y tamaños (/, /var, swap)
lsblk
df -h

# Mostrar procesos que se están ejecutando y ruta actual
ps
pwd

# Comprobar el estado del servicio SSH
sudo systemctl status ssh

# Comprobar el estado del cortafuegos UFW
sudo systemctl status ufw
sudo ufw status

# Comprobar el estado del Antivirus ClamAV
sudo systemctl status clamav-daemon
sudo systemctl status clamav-freshclam
```
*(Opcional: Conectarse desde el SSH remoto a la IP asignada: `ssh miadmin@10.199.9.1114`).*

---

## 2. Cuentas de Administración

### 2.1. Cuentas Administradoras (`miadmin` y `miadmin2`)

Además de `miadmin` (creada en la instalación), creamos la cuenta administradora secundaria `miadmin2`:

```bash
# Crear miadmin2 (te pedirá introducir la contraseña, escribe: paso)
sudo adduser miadmin2

# Darle permisos de administrador a miadmin2
sudo usermod -aG sudo miadmin2
sudo usermod -aG sudo,adm,cdrom,dip,plugdev,lxd miadmin2
```

---

### 2.2. Comprobación de Cuentas y Permisos

```bash
# Comprobar los usuarios (miadmin y miadmin2) y a qué grupos pertenecen (deben estar en 'sudo')
id miadmin
cat /etc/passwd | grep miadmin
cat /etc/group | grep miadmin

id miadmin2
cat /etc/passwd | grep miadmin2
cat /etc/group | grep miadmin2
```
---

## 3. Apache

### 3.1. Instalación de Apache2

```bash
sudo apt install apache2 -y
```

---

### 3.2. Configuración de HTTP, SSL y Cortafuegos

```bash
# Activar el módulo SSL
sudo a2enmod ssl

# Activar el sitio por defecto con HTTPS
sudo a2ensite default-ssl

# Reiniciar Apache para aplicar los cambios
sudo systemctl restart apache2

# Permitir tráfico HTTP y HTTPS en el cortafuegos
sudo ufw allow 'Apache Full'
```

#### Configuracion de Archivo apache.conf

Entrar al archivo usando `sudo nano /etc/apache2/apache2.conf`  

**Escribe en el archivo:**

> Servername *nombre_de_la_maquina*

Comprobar que no haiga errores en el archivo de configuracion: `sudo apache2ctl configtest`  
Reinicio de apache: `sudo systemctl restart apache2`  


#### Configuracion de Codigos de Errores con HTTP 

Hacer copia del archivo de configuracion con: `sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.backup`  
Entrar al archivo usando: `sudo nano /etc/apache2/sites-available/000-default.conf`  

**Escribe en el archivo:**
```bash
<VirtualHost *:80>
...

ErrorDocument 404 /error/error.html
</VirtualHost>
```
Comprobar que no haiga errores en el archivo de configuracion: `sudo apache2ctl configtest`  
Reinicio de apache: `sudo systemctl restart apache2`  

---

### 3.3. Configuracion Apache HTTPS

**Creacion de certificado y llave de autofirmado**

- Un certificado autofirmado cifrará la comunicación entre su servidor y cualquier cliente. Sin embargo, dado que no está firmado por ninguna de las autoridades certificadoras de confianza incluidas con los navegadores web y los sistemas operativos, los usuarios no pueden usar el certificado para validar la identidad de su servidor de forma automática. Como resultado, sus usuarios verán un error de seguridad cuando visiten su sitio.

> `sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt -subj "/CN=10.199.9.114" -addext "subjectAltName = IP:10.199.9.114"`

**Explicacion del Comando**
- Openssl -> Es la utilidad para trabajar con criptografía y certificados.​
- Req -> Modulo de gestión de certificados​
- x509 -> Certificado X.509 autofirmado​
- nodes -> La clave privada se genera mediante una passphrase (así no pide una contraseña)​
- days 365 -> Válido por 365 días​
- newkey rsa:2048 -> Clave RSA de 2048 bits​
- keyout -> Ruta para guardar la clave privada​
- out -> Ruta para guardar el certificado

Hacer copia del archivo de configuracion: `sudo cp /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf.backup`  
Entrar al archivo usando: `sudo nano /etc/apache2/sites-available/default-ssl.conf`  

**Modificar el archivo:**
```bash
<VirtualHost *:443>
  ServerAdmin webmaster@localhost​
  ServerName DirecciónIP​
  DocumentRoot /var/www/html ​

  SSLEngine on ​
  SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt ​
  SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key ​

  ErrorLog ${APACHE_LOG_DIR}/daw-ssl-error.log ​
  CustomLog ${APACHE_LOG_DIR}/daw-ssl-access.log combined 
</VirtualHost>
```
Aplicar cambios: `sudo a2ensite default-ssl.conf`
Comprobar que no haiga errores en el archivo de configuracion: `sudo apache2ctl configtest`  
Reinicio de apache: `sudo systemctl restart apache2`  

#### Redireccion HTTP a HTTPS

Usar el comando `sudo a2enmod rewrite` para activar el modulo de rewrite   

Entrar al archivo de configuracion usando `sudo nano /etc/apache2/apache2.conf`  

**Modificar el valor de AllowOverride en el archivo:**
```bash
<Directory /var/www/>
  ...
  AllowOverride All
</Directory>
```

Comprobacion del archivo: `sudo apache2ctl configtest`
Recarga del servicio: `sudo systemctl reload apache2`


**Creacion de Fichero .htaccess**
*Usar el usuario operadorweb para esto paso*

Crear fichero .htaccess en el DocumentRoot  

- En este caso `/var/www/html/.htaccess`

Contenido del fichero:
```bash
RewriteEngine On ​
RewriteCond %{SERVER_PORT} 80 ​
RewriteRule ^(.*)$ https://IPMAQUINA/$1 [R,L]
```

**Explicacion de las directivas de .htaccess**
- **Options +FollowSymLinks** - es una directiva de Apache, requisito previo para mod_rewrite.
- **RewriteEngine On** - habilita mod_rewrite.
- **RewriteCond %{SERVER_PORT} 80** - sirve para indicar que todas las peticiones que se realicen al puerto 80 (puerto por defecto de Apache para servicio web), deseamos que vayan a través de la regla especificada.
- **RewriteRule** - define una regla particular. Dentro de la regla de reescritura, la primera cadena de caracteres después de RewriteRule, define lo que la URL original parece. La segunda cadena después de RewriteRule define la nueva URL.
- **$1** - Este carácter especial, sustituye (o indica) la parte entre paréntesis, especificada en la primera cadena. Básicamente, lo que haces es asegurar que las sub-páginas redireccionan a la misma sub-página y no a la página principal. Puede omitirlo para redirigir a la página principal. (Si usted no tiene el mismo contenido en el nuevo directorio que había en el antiguo directorio, deje esta expresión regular
- **[R,L]** - Esta opción, realiza una redirección, y también deshabilita que las reglas de reescritura que estén escritas después afecten a la dirección URL (una buena idea para añadir después de la última rewrite rule).

#### Configuracion de Codigos de Errores con HTTPS 

Hacer copia del archivo de configuracion, si no ha sido copiado previamente: `sudo cp /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf.backup`  
Entrar al archivo usando: `sudo nano /etc/apache2/sites-available/default-ssl.conf`  

**Escribe en el archivo:**
```bash
<VirtualHost *:443>
...

ErrorDocument 404 /error/error.html
</VirtualHost>
```
Comprobar que no haiga errores en el archivo de configuracion: `sudo apachectl configtest`  
Reinicio de apache: `sudo systemctl restart apache2`  

---

### 3.4. Comprobación del Servicio Apache

```bash
# Comprobar el estado del servicio Apache (HTTP/HTTPS)
sudo systemctl status apache2

# Comprobar que la regla 'Apache Full' está activa en el cortafuegos
sudo ufw status

# Comprobar que Apache escucha en los puertos 80 y 443
sudo ss -tlpn | grep apache2

# Comprobar modulos de apache
sudo apache2ctl -M

# Comprobar sites de apache
sudo apache2ctl -S
```
- **Comprobación web:** Entra desde el navegador del equipo anfitrión a `http://<IP_SERVIDOR>` y `https://<IP_SERVIDOR>` para verificar que carga la página por defecto de Apache2.

---

## 4. PHP

### 4.1. Instalación de PHP 8.5-FPM

```bash
# Instalar php8.5-fpm
sudo apt install php8.5-fpm -y

# Reiniciar php8.5-fpm
sudo systemctl restart php8.5-fpm
```

---

### 4.2. Integración de PHP-FPM con Apache2

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

 ```text
display_errors = On
error_reporting = E_ALL
display_startup_errors = On
file-uploads = On
allow-url_fopen = On
memory_limit = 256M
upload_max_filesize = 100M
max_execution_time = 360
date.timezone = Europe/Madrid
```
---

### 4.3 Modulo Xdebug

Instala el servicio con el comando:
`sudo apt instal php-xdebug` 

haz una copia del archivo de configuracion con:
`sudo cp /etc/php/8.5/mods-available/xdebug.ini /etc/php/8.5/mods-available/xdebug.ini.backup`

accede al archivo de configuracion con:
`sudo nano /etc/php/8.5/mods-available/xdebug.ini`

Cambia el contenido del archivo a esto:
```text
[xdebug]
zend_extension=xdebug.so
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.discover_client_host=true
xdebug.client_port=9003
xdebug.idekey=NetBeans
xdebug.log=/var/log/xdebug.log
```

**Explicacion:**
-zend_extension=xdebug.so: Carga la extensión Xdebug en PHP.
-xdebug.mode=debug: Activa el modo de depuración paso a paso (breakpoints, trazado).
-xdebug.start_with_request=yes: Inicia la depuración en todas las peticiones, sin tener que añadir nada a la URL.
-xdebug.discover_client_host=true: Xdebug detecta automáticamente la IP del cliente que ha hecho la petición HTTP y le devuelve la conexión de depuración. Así funciona igual en clase y en casa sin cambiar la IP.
-xdebug.client_port=9003: Puerto del cliente donde escucha NetBeans (es el puerto por defecto de Xdebug 3; Xdebug 2 usaba el 9000).
-xdebug.idekey=NetBeans: Identificador de la sesión. Debe coincidir con el Session ID configurado en NetBeans.
-xdebug.log=/var/log/xdebug.log: Fichero de log, muy útil cuando la conexión no funciona.


Reinicia los servicios con: 
```bash
sudo systemctl restart php8.5-fpm
sudo systemctl restart apache2
```

y comprueba la instalacion de modulo con:
`php-fpm8.5 -m | grep -i xdebug`

---

### 4.4. Comprobación del Servicio PHP-FPM

```bash
# Comprobar el estado del servicio PHP-FPM
sudo systemctl status php8.5-fpm
sudo systemctl status php*-fpm

# Comprobar la versión instalada de PHP
php -v

```

## 5. MariaDB

### 5.1. Instalación de MariaDB

```bash
sudo apt update

# Instalar mariadb-server
sudo apt install mariadb-server -y

# Reiniciar mariadb-server 
sudo systemctl restart mariadb 
```

---

### 5.2. Configuración de MariaDB

#### Configuración de puerto

- Usar `sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf` para entrar el archivo de configuracion
- Busca la linea `bind-address = 127.0.0.1`
- Cambiala a `bind-address = 0.0.0.0`
- Guarda cambios

#### Creación de Usuario

- Usa el comando `sudo mariadb` para entrar a mariadb
- Usa el comando `CREATE USER 'adminsql'@'%' IDENTIFIED BY 'paso';` para crear el usuario
- Usa el comando `GRANT ALL ON *.* TO 'adminsql'@'%' WITH GRANT OPTION;` para otorgar los privilegios de admin
- Usa el comando `SELECT User, Host FROM mysql.user;` para comprobar si el usuario se creo correctamente
- Usa `exit` para salir de mariadb

#### Instalación Segura

- Usa el comando `sudo mariadb-secure-installation` iniciar la instalacion segura

**Responder de la siguiente forma**
- Contraseña de root (vacia por predeterminado): *PULSA ENTER* 
- Cambiar a autentificación unix_socket: `Y`
- Cambiar a contraseña de root: `Y`
- Nueva contraseña: `paso`
- Eliminar usuarios anonimos:`Y`
- No permitir iniciar sesion con root remotamente:`Y`
- Eliminar base de datos "test": `Y`
- Recargar privilegios: `Y`

#### Instalación de Modulo de mysql en PHP

```bash
# Instalar extension
sudo apt install php8.5-mysql

# Reiniciar servicio
sudo systemctl restart php8.5-fpm

# Reiniciar servicio
sudo systemctl restart mariadb
```

#### Abrir Puerto en UFW

```bash
# abrir puerto
sudo ufw allow mysql

```

---

### 5.3. Comprobación del Servicio MariaDB

```bash
# Comprobar puerto
sudo ss -punta |grep mariadb

# Comprobar servicio
sudo systemctl status mariadb

# Comprobar puerto abierto en el cortafuegos
sudo ufw status

```

---

### 5.4 Instalación de phpMyAdmin

- Usa el comando `sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl` iniciar la instalacion de phpmyadmin

**Advertencia! Seguir Pasos**
- Seleccion del servidor escoge: `Apache 2`  
- **Pulsa la barra espaciadora para seleccionar Apache2**
- Presiona **TAB** y Luego **ENTER**
- Utilizar dbconfig-common para configurarbase de datos: `YES`
- Eligir contraseña: `paso`
- Reescribir contraseña: `paso`
- Ingresar contraseña: `paso`

---
### 5.5 Comprobación de phpmyadmin

Accede a traves de la URL **http://IP/phpmyadmin**  

---

## 6. Cuentas de Desarrollo

### 6.1 Cuentas de Desarrollo (`operadorweb`)

El usuario operador web gestiona el contenido del servidor web con permisos limitados a `/var/www/html`.

> - [X] **operadorweb/paso** - Gestión de contenido web

**Características:**
- **Directorio home:** `/var/www/html`
- **Grupo primario:** `www-data`
- **Shell:** `/bin/bash`
- **Permisos:** `rwx` en `/var/www/html`

**Creación del Usuario Operador Web:**
```bash
# Crear usuario operador web
sudo useradd -M -d /var/www/html -g www-data -s /bin/bash operadorweb

# Establecer contraseña (paso)
sudo passwd operadorweb
```
**Explicación de parámetros:**
- `-M`: No crear directorio home automáticamente
- `-d /var/www/html`: Directorio home existente
- `-g www-data`: Grupo primario
- `-s /bin/bash`: Shell bash

**Configurar Propiedad y Permisos:**
```bash
# Cambiar propietario y grupo
sudo chown -R operadorweb:www-data /var/www/html

# Establecer permisos
sudo chmod -R 775 /var/www/html
```
**Explicación y justificación de permisos 775:**
- **7** (Propietario `operadorweb`): `rwx` $\rightarrow$ puede crear, modificar y eliminar archivos.
- **7** (Grupo `www-data` / Apache): `rwx` $\rightarrow$ puede leer, ejecutar y escribir si es necesario.
- **5** (Otros): `r-x` $\rightarrow$ solo lectura y ejecución.


### 6.2 Cuentas de Desarrollo Enjauladas (`enjaulado`)

El usuario enjaulado gestiona el contenido del servidor web con con acceso limitado a `/var/www/html`.

**Creacion del Grupo**
`sudo groupadd sftusers`

**Creacion del Usuario enjaulado**
`sudo useradd -g www-data -G sftpusers -m -d /var/www/nombreusuario enjaulado1`

**Cambio de Contraseña**
`sudo passwd enjaulado1`

**Cambiar de Propietario el Directorio**
`sudo chown root:root /var/www/nombreusuario`

**Cambiar de Permisos del Usuario**
`sudo chmod 555 /var/www/nombreusuario`

**Creacion de la Capeta httpdocs**
`sudo mkdir /var/www/enjaulado1/httpdocs`

**Cambiar Permisos de la Capeta httpdocs**
`sudo chmod 2775 -R /var/www/enjaulado1/httpdocs`

**Cambiar Propietario de la Capeta httpdocs**
`sudo chown enjaulado1:www-data -R /var/www/enjaulado1/httpdocs`

**Cambiar Propietario de la Capeta httpdocs**
`sudo chown enjaulado1:www-data -R /var/www/enjaulado1/httpdocs`

**Cambiar Archivo Configuracion**
`sudo nano /etc/ssh/sshd_config`

buscar y comentar linea `Subsystem sftp /usr/ñib/openssh/sftp-server` 
Agregar
```bash
Subsystem sftp internal -sftp

Match Group sftpusers
ChrootDirectory %h 
ForceCommand internal-sftp -u 2
AllowTcpForwarding no 
PermitTunnel no 
X11Forwarding no
```

### 6.3 Comprobacion de Creacion
```bash
# Ver información
id operadorweb

# Verificar propiedad
ls -la /var/www/

# Verificar permisos
ls -ld /var/www/html

# Verificar grupos
cat /etc/group | grep sftp
```

**Salida esperada:**
`drwxrwxr-x 2 operadorweb www-data 4096 nov 30 10:00 /var/www/html`

*(Opcional) Crear cuentas adicionales estándar si es necesario:*
```bash
# Crear operadorweb2 (Contraseña: paso)
sudo adduser operadorweb2

# Crear operadorweb3 (Contraseña: paso)
sudo adduser operadorweb3
```


## 7. SSH

### 7.1 Instalacion de SSH

El servicio ssh se puede instalar en la configuracion Inicial de la maquina  
para comprobar usa `sudo systemctl status ssh`

en caso de que no este instalado:
```bash
# Actualizar el sistema
sudo apt update

# Instalacion de servicio
sudo apt install ssh -y
```

### 7.2 Mantenimiento de SSH

Los siguientes comandos estan disponibles para el mantenimiento del servicio

- **Estado:** `sudo systemctl status ssh`
- **Iniciar:** `sudo systemctl start ssh`
- **Detener:** `sudo systemctl stop ssh`
- **Reiniciar:** `sudo systemctl restart ssh`
- **Habilitar:** `sudo systemctl enable ssh`
- **Deshabilitar:** `sudo systemctl disable ssh`
- **Recargar:** `sudo systemctl reload ssh`


### 7.3 Ejemplo de Uso de SSH

El servicio ssh permite a los usuarios acceder a mauinas remotamente 

> ssh *nombreUsuario*@*ipMaquina*

**Ejemplo:**

> ssh miadmin@10.199.9.114

## 8. UFW

### 8.1 Instalacion de UFW

El servicio de cortafuegos viene instalado en la configuracion Inicial de la maquina  
para comprobar usa `sudo systemctl status ufw`

en caso de que no este instalado:
```bash
# Actualizar el sistema
sudo apt update

# Instalacion de servicio
sudo apt install ufw -y
```

### 8.2 Mantenimiento de UFW

Los siguientes comandos estan disponibles para el mantenimiento del servicio

- **Estado:** `sudo systemctl status ssh`
- **Iniciar:** `sudo systemctl start ssh`
- **Detener:** `sudo systemctl stop ssh`
- **Reiniciar:** `sudo systemctl restart ssh`
- **Habilitar:** `sudo systemctl enable ssh`
- **Deshabilitar:** `sudo systemctl disable ssh`
- **Recargar:** `sudo systemctl reload ssh`


En caso de que quieras ver los puertos abiertos usa el comando:

> sudo ufw status

y a detalle el comando:

> sudo ufw status verbose

En caso de que quieras borrar algun puerto de la regla usa el siquiente comando para ver su numero:

> sudo ufw status numbered

y luego usa el siguiente comando con el numero del puerto que quieras cerrar:

> sudo ufw delete *numeroPuerto*

### 8.3 Puertos abiertos

| Servicio | Puerto | Explicaciones |
|---|---|---|
| SSH (OpenSSH) | `22` | Control remoto (`miadmin`) desde CMD o MobaXterm. |
| SFTP | `22` | TCP |  Va sobre SSH. Lo usan NetBeans, VS Code y MobaXterm con `operadorweb`. |
| Apache2 HTTP | `80` | Redirige a HTTPS mediante el `.htaccess` (apartado 3.5). |
| Apache2 HTTPS | `443` | Sitio seguro `default-ssl.conf` con certificado autofirmado. |
| MariaDB | `3306` | Ejecutar scripts sql desde NetBeans |


---
Autores: Juan Miguel Dominguez Perdigon y Moises Alberto Dominguez Cruz 