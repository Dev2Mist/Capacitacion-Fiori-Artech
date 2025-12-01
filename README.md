# 📋 TODO-APP | Aplicación de Gestión de Tareas

> **Proyecto de Capacitación Fiori** | ARTECH  
> Desarrollo profesional a través de la **Beca Fundación Pescar**

---

## 🚀 Podés acceder acá: [Pastel Do - ToDo App](https://dev2mist.github.io/ARTECH-Capacitacion-Fiori/) 🚀

## 🎯 Descripción del Proyecto

**TODO-APP** es una aplicación web moderna y funcional para la gestión de tareas diarias. Diseñada con una interfaz elegante en tonos pastel y desarrollada con **JavaScript vanilla**, esta aplicación demuestra principios sólidos de arquitectura de software mediante el patrón **MVC (Modelo-Vista-Controlador)**.

El proyecto fue creado como parte de la capacitación en **Fiori** para ARTECH durante mi desarrollo profesional en el marco de la **Beca Fundación Pescar**, enfocándose en las mejores prácticas de desarrollo web y organización de código modular.

---

## ✨ Características Principales

### 🎨 Interfaz Elegante

- Diseño responsivo con paleta de colores **pastel personalizada**
- Experiencia visual moderna y accesible
- Animaciones fluidas y transiciones suaves
- Sidebar dedicado para tareas completadas

### ⚙️ Funcionalidades Completas

- ✅ **Crear tareas** con título y descripción
- 🔄 **Actualizar tareas** mediante modal interactivo
- 🗑️ **Eliminar tareas** individuales o en lote
- ✔️ **Completar tareas** con animación visual
- 📊 **Contador automático** de tareas completadas
- 💾 **Persistencia de datos** mediante localStorage

### 🏗️ Arquitectura Robusta

- Patrón **MVC** bien definido
- Separación clara de responsabilidades
- Código modular y reutilizable
- Estructura de carpetas intuitiva

---

## 📁 Estructura del Proyecto

```
ARTECH-Capacitacion-Fiori/
│
├── 📄 index.html          # Estructura HTML principal
├── 🎨 styles.css          # Estilos y diseño visual
│
├── 📂 js/
│   ├── main.js            # 🎮 Controlador (MVC)
│   ├── storage.js         # 💾 Modelo (Gestión de datos)
│   ├── ui.js              # 👁️ Vista (Renderizado)
│   └── utils.js           # 🔧 Utilidades (Funciones auxiliares)
│
└── 📖 README.md           # Este archivo
```

### 🔍 Detalle de Módulos

| Archivo        | Rol            | Responsabilidad                                    |
| -------------- | -------------- | -------------------------------------------------- |
| **main.js**    | 🎮 Controlador | Gestiona eventos del usuario y lógica de negocio   |
| **storage.js** | 💾 Modelo      | Maneja persistencia de datos en localStorage       |
| **ui.js**      | 👁️ Vista       | Renderiza elementos del DOM y gestiona animaciones |
| **utils.js**   | 🔧 Utilidades  | Proporciona funciones reutilizables                |

---

## 🚀 Cómo Usar

### Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Soporte para **ES6 Modules**
- JavaScript habilitado

### Instalación y Ejecución

1. **Clonar o descargar el repositorio**

   ```bash
   git clone https://github.com/Dev2Mist/Capacitacion-Fiori-Artech.git
   cd ARTECH-Capacitacion-Fiori
   ```

2. **Abrir en el navegador**

   - Hacer doble clic en `index.html`
   - O servir con un servidor local:

     ```bash
     # Python 3
     python -m http.server 8000

     # Node.js (con http-server)
     npx http-server
     ```

3. **Comenzar a usar**
   - Ingresa el título y descripción de la tarea
   - Haz clic en **"Crear"** para agregar
   - Usa los botones de acción para gestionar tareas

---

## 💡 Flujo de Uso

```
Usuario escribe tarea
        ↓
[Crear] → main.js genera JSON
        ↓
        ↓→ storage.js guarda en localStorage
        ↓→ ui.js renderiza en DOM
        ↓
Usuario ve tarea en lista
        ↓
[Completar/Editar/Borrar]
        ↓
Acciones reflejadas en localStorage
```

---

## 🎓 Conceptos Implementados

### Patrón MVC

- **Modelo:** Gestión pura de datos (storage.js)
- **Vista:** Renderizado visual y interacción (ui.js)
- **Controlador:** Orquestación de lógica (main.js)

### JavaScript Avanzado

- ✨ Módulos ES6 (import/export)
- 🎯 Arrow functions y destructuring
- 💬 Template literals
- 🔄 Operaciones del DOM
- 💾 API localStorage
- 📅 Dates para timestamps

### Patrones de Diseño

- Callbacks para comunicación entre módulos
- Funciones puras en utilidades
- Separación de responsabilidades
- Código autodocumentado

---

## 🎨 Paleta de Colores

| Variable          | Color       | Uso                              |
| ----------------- | ----------- | -------------------------------- |
| `--bg-body`       | `#7339a3dc` | Fondo general (morado)           |
| `--color-primary` | `#A0C4FF`   | Botón crear (azul cielo)         |
| `--color-success` | `#6ed478`   | Botón completar (menta)          |
| `--color-danger`  | `#fa7b72`   | Botón borrar (rosa salmón)       |
| `--color-warning` | `#FDFFB6`   | Botón editar (amarillo vainilla) |

---

## 📝 Ejemplo de Estructura de Datos

```javascript
{
  id: "1234567890",
  name: "Aprender JavaScript",
  description: "Dominar ES6, módulos y patrones de diseño",
  completed: false
}
```

---

## 🔧 Funciones Principales

### Controlador (main.js)

- `generateTaskJSON()` - Crea estructura de tarea
- `handleCompleteTask()` - Marca tarea como completada
- `handleDeleteTask()` - Elimina tarea
- `handleUpdateTask()` - Abre modal para editar

### Modelo (storage.js)

- `saveTaskToStorage(task)` - Guarda/actualiza
- `deleteTaskFromStorage(id)` - Elimina de storage
- `getAllTasksFromStorage()` - Recupera todas las tareas

### Vista (ui.js)

- `renderTodoItem()` - Renderiza tarea en lista
- `renderCompletedTask()` - Renderiza en sidebar
- `showUpdateModal()` - Abre modal de edición
- `clearMainInputs()` - Limpia formulario

---

## 🎯 Capacidades de Aprendizaje

Este proyecto es ideal para aprender:

- ✅ Arquitectura MVC en JavaScript
- ✅ Manipulación del DOM
- ✅ Gestión de estado con localStorage
- ✅ Módulos y modularidad
- ✅ Event handling y callbacks
- ✅ Buenas prácticas de código
- ✅ Diseño responsivo con CSS moderno

---

## 📚 Tecnologías Utilizadas

```
Frontend Stack:
├── HTML5
├── CSS3 (Flexbox, animaciones)
└── JavaScript Vanilla (ES6+)

Storage:
└── localStorage API
```

---

## 🎖️ Proyecto de Formación

> **Este proyecto fue desarrollado como parte de la capacitación en Fiori para ARTECH durante mi desarrollo profesional en el marco de la **Beca Fundación Pescar**.**

### Objetivos Educativos Alcanzados

- ✔️ Dominio de arquitectura MVC
- ✔️ Desarrollo modular y escalable
- ✔️ Buenas prácticas de JavaScript
- ✔️ Interfaz de usuario moderna
- ✔️ Persistencia de datos

---

## 📞 Información del Desarrollador

- **Desarrollador:** Benjamin Ramírez Borges
- **Contacto:** benjaminborges.dev@gmail.com
- **Proyecto:** ARTECH-Capacitacion-Fiori
- **Beca:** Fundación Pescar
- **Rama:** 1.Ejercicio(to-do)
- **Fecha:** Diciembre 2025

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

## 🌟 Contribuciones

Las sugerencias y mejoras son bienvenidas. Siéntete libre de hacer fork del proyecto y enviar pull requests.

---

<div align="center">

**Desarrollado con ❤️ durante la Capacitación Fiori en ARTECH**

_"La educación es la herramienta más poderosa para cambiar el mundo"_ - Nelson Mandela

</div>
