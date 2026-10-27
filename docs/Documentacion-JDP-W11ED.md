# W11ED - Cliente de Desarrollo

## Índice de Contenidos

- [W11ED - Cliente de Desarrollo](#w11ed---cliente-de-desarrollo)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [1. Configuracion Inicial de la Maquina](#1-configuracion-inicial-de-la-maquina)
    - [1.1 Especificaciones de la Maquinas:](#11-especificaciones-de-la-maquinas)
  - [2. Cuentas Administradoras y Cuenta de Desarrollo](#2-cuentas-administradoras-y-cuenta-de-desarrollo)
    - [2.1 Cuentas](#21-cuentas)
  - [3. Navegadores](#3-navegadores)
    - [3.1 Google Chrome](#31-google-chrome)
  - [4. MobaXterm](#4-mobaxterm)
    - [4.1 Instalacion](#41-instalacion)
    - [4.2 Crear Session SSH](#42-crear-session-ssh)
    - [4.3 Crear Session SFTP](#43-crear-session-sftp)
  - [5. IDE Netbeans](#5-ide-netbeans)
    - [5.1 Instalacion](#51-instalacion)
    - [5.2 Configuracion](#52-configuracion)
      - [Gestion de Pluggins](#gestion-de-pluggins)
        - [Abrir](#abrir)
        - [Actualizar](#actualizar)
        - [Descargar](#descargar)
        - [Administrar](#administrar)
    - [5.3 Ejemplo de Uso](#53-ejemplo-de-uso)
      - [Creación de Proyecto en Netbeans](#creación-de-proyecto-en-netbeans)
        - [Pasos de Creación](#pasos-de-creación)
        - [Conexión con el Servidor](#conexión-con-el-servidor)
      - [Pasos de Creación de Archivo](#pasos-de-creación-de-archivo)
      - [Modificación de Proyecto en Netbeans](#modificación-de-proyecto-en-netbeans)
      - [Eliminación de Proyecto en Netbeans](#eliminación-de-proyecto-en-netbeans)
      - [Enlace de Proyecto en Netbeans con el GitHub](#enlace-de-proyecto-en-netbeans-con-el-github)

---



## 1. Configuracion Inicial de la Maquina 

### 1.1 Especificaciones de la Maquinas:
Sistema Operativo: `Windows 11`
Cuenta de Operador: `juanm.domper`
Ruta de Proyectos: `D:\ProyectosNB`

## 2. Cuentas Administradoras y Cuenta de Desarrollo

### 2.1 Cuentas

## 3. Navegadores

### 3.1 Google Chrome

> - El navegador utilizado es Google Chrome

## 4. MobaXterm

### 4.1 Instalacion

> Descarga MobaxTerm desde el siguiente enlace: https://mobaxterm.mobatek.net/download.html 

### 4.2 Crear Session SSH

1. Abrir MobaxTerm y darle click en el boton session
2. Selecciona el tipo de session `SSH`
3. Introducir IP en el campo `Remote Host` (ej. 10.199.9.114)
4. Introducir el nombre del usuario en el campo `Username` (ej. miadmin)
5. Haz click en `OK` y procede a introucir la contraseña

### 4.3 Crear Session SFTP

1. Abrir MobaxTerm y darle click en el boton session
2. Selecciona el tipo de session `SFTP`
3. Introducir IP en el campo `Remote Host` (ej. 10.199.9.114)
4. Introducir el nombre del usuario en el campo `Username` (ej. operadorweb)
5. Haz click en `OK` y procede a introucir la contraseña
6. Abrira una ventana con las carpetas locales a la izquierda y las remotas a la derecha
  

## 5. IDE Netbeans

### 5.1 Instalacion

> Descargar NetBeans desde el siguiente enlace: https://netbeans.apache.org/front/main/index.html 

- Durante la instalacion, deberas seleccionar la herramientas que vayas a utilizar como Java o PHP

### 5.2 Configuracion

**Para Trabajar con PHP en NetBeans te Hara Falta Activar un Plugin**

- Haz click en `Tools` y luego en `Plugins`
- Haz click en `Installed`
- Selecciona los plugins `PHP` y `HTML`
- Haz click en `Activate` y cierra la ventana 

#### Gestion de Pluggins

##### Abrir
- Haz click en `Tools` y luego en `Plugins`

##### Actualizar
- Haz click en `Updates` y luego en `Check for Updates`
- Actualiza cualquier plugin disponible

##### Descargar
- Haz click en `Available Plugins` y luego en `Check for Newest`
- Selecciona los plugins deseados y luego haz click en `Install`

##### Administrar 
- Haz click en `Installed`
- Selecciona los plugins deseados y podemos escoger si `Activate`, `Deactivate` o `Unistall`

### 5.3 Ejemplo de Uso


#### Creación de Proyecto en Netbeans

##### Pasos de Creación
1. Haz click en `File` y luego haz lick en `New Proyect...`
2. En categorias seleccionamos `PHP` y en proyectos `PHP Application`
3. Luego, nombra al proyecto basado en los estandares: `JDPXXXProyectoXXX`
4. Guarda el proyecto en la ruta: `D:\ProyectosNB\JDPXXXProyectoXXX`
5. Escoge la version de PHP que te corresponda


##### Conexión con el Servidor
6. En la Run Configuration escoge `Remote Web Site`
7. La URL del Proyecto es `http://localhost/JDPXXXProyectoXXX`
8. En el directorio de subida escribe `/JDPXXXProyectoXXX`
9. La subida de archivos escoge `On save`
 
10. **Conexion Remota**
    - Haz click en `Manage` y luego haz lcik en `add`
    - Escribe un noombre apropiado para la conexion y escoge el tipo de conexion `sftp`
    - Hostname: Direccion IP del servidor (ej. 10.199.9.114)
    - Username: nombre del usuario (ej. operadorweb)
    - Contraseña: contraseña del usuario
    - Directorio Inicial: `/var/www/html`
    - Haz click en `Test Connection` y comprueba la conexion, luego haz click en `OK`

11. Haz click en `Finish` para terminar la creacion

**Finalizamos Creación**


#### Pasos de Creación de Archivo
1. Haz click derecho en el proyecto donde deseas guardad el fichero
2. Click en `New` y luego en tipo de archivo que te interese
3. Escribe el nombre que refleje los estandares y finaliza


#### Modificación de Proyecto en Netbeans

1. Haz click derecho en el proyecto que deseas modificar
2. Podemos `Cambiar el nombre`, `Mover`, o `Copiar`
3. Y si le damos click a `Properties`,  Podremos ver la configuracion del Proyecto y hacer cualquier modificacion que queramos


#### Eliminación de Proyecto en Netbeans

1. Haz click derecho en el proyecto que deseas eliminar
2. Haz click en  `Delete`
3. Selecciona el checkbox y luego haz click en `yes` para eliminar todo el directorio del Proyecto

#### Enlace de Proyecto en Netbeans con el GitHub

