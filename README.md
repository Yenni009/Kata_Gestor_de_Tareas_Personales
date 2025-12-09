# Gestor de Tareas Personales

Aplicación full-stack diseñada para gestionar tareas personales, permitiendo al usuario crear, editar, completar y eliminar actividades. El proyecto está dividido en frontend, backend y base de datos, cada uno desplegado en un servicio distinto.

---

## Tecnologías utilizadas

### Frontend

* Vite
* JavaScript
*  CSS
* Desplegado en Netlify

### Backend

* Node.js
* Express
* Desplegado en Render

### Base de Datos

* MongoDB
* Desplegada en Railway

---

## Enlaces del proyecto

* Frontend (Netlify): https://todopixell.netlify.app/
* Backend (Render): https://kata-gestor-de-tareas-personales.onrender.com/
* Base de datos (Railway): uso interno

---



## Funcionalidades principales

* Crear nuevas tareas
* Editar tareas existentes
* Marcar tareas como completadas
* Eliminar tareas
* Persistencia de datos mediante MongoDB
* API REST conectada al frontend

---

## Instalación y ejecución local

### Clonar el repositorio

```
(https://github.com/Yenni009/Kata_Gestor_de_Tareas_Personales.git)
```

### Instalacion de Mongo DB

```
Previamente debes instalar la version actual de MongoDB
```

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## Variables de entorno

El backend requiere las siguientes variables:

```
MONGODB_URI=
PORT=
```

---

## API Endpoints principales

### GET /tasks

Obtiene todas las tareas.

### POST /tasks

Crea una nueva tarea.

### PUT /tasks/:id

Actualiza una tarea.

### DELETE /tasks/:id

Elimina una tarea.

---

## Contribuciones

Las contribuciones, issues y mejoras son bienvenidas.



---

