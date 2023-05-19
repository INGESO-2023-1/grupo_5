# Grupo 5
## Requisitos
* Node: Entorno de ejecución de JavaScript fuera del navegador.
* NPM: gestor de paquetes.
## Instalación de paquetes
Para instalar los paquetes requeridos (react,react-router,etc...) usa el siguiente comando.
```sh
npm install
```
## Configuración
Para poder ejecutar la aplicación se requiere el uso de MySql y para configurar la base de datos con el proyecto se tendrá que crear un archivo .env (.env.example es un ejemplo del archivo .env). 
Ademas se tendrá que crear y configurar en el .env una clave publica y privada para la generación de los token JWT. 
Se puede usar el siguiente comando para generar las dos llaves:
```sh
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key 
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```
## Ejecución
Para los diferentes modos de ejecución se tienen los siguientes comandos:
```sh
npm run start -> Inicio backend en modo de producción 
npm run dev -> Inicio backend en modo de desarrollo 
npm run webpack-prod -> Inicio frontend en modo de producción (en este caso se genera solamente el archivo bundle optimizado)
npm run webpack-dev -> Inicio frontend en modo de desorrollo
```


