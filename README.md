# 📘 Frontend – Angular 
- Esto responde a las indicaciones de uso.

## 📋 Requisitos previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- **Node.js** version 22.13.1
  https://nodejs.org/

- **Angular CLI**  
  ```bash
  npm install -g @angular/cli
 
## 📦 Instalación del proyecto
  ```bash
  git clone https://github.com/AaronBadillaL/P1700-WEB

  cd P1700-WEB
```
  -Installar dependencias
  ```bash
  npm install

```
## ⚙️ Configuración de entorno
- El frontend se comunica con el backend mediante una URL base configurada en:
   ```bash
  src/environments/environment.ts
  ```
- Ejemplo
  ```bash
  export const environment = {
  apiUrl: 'https://localhost:7092'
  };
  ```
## ▶️ Ejecución del proyecto
  ```bash
    ng serve -o
  ```
