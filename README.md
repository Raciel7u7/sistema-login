<div align="center">

<img src="https://www.cdcuauhtemoc.tecnm.mx/wp-content/uploads/2021/08/LOGO-VERTICAL-TECNM.png" alt="Tecnológico Nacional de México" width="70" align="left">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg/1280px-Instituto_Tecnologico_de_Oaxaca_-_original.svg.png" alt="Instituto Tecnologico de Oaxaca" width="70" align="right"><br>

# Instituto Tecnológico de Oaxaca

### Login y Panel de Administración

#### Login con validaciones, y panel interno con sidebar, navbar y captura de usuarios/alumnos

**Cruz Bautista Mauricio Raciel**  
**Chavez Hernandez Luis Eduardo**  
Ingeniería en Sistemas Computacionales  
Programación Web, Verano 2026

</div>

---

## Contenido

- [Descripción](#descripción)
- [Demo](#demo-en-vivo)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Explicación y documentación técnica](#explicación-y-documentación-técnica)
- [Métodos principales de `utileria.js`](#métodos-principales-de-utileriajs)
- [Proceso de creación](#proceso-de-creación)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Capturas de pantalla](#capturas-de-pantalla)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Rúbrica cubierta](#rúbrica-cubierta)
- [Participación del equipo](#participación-del-equipo)
- [Autores](#autores)

---

## Descripción

**Login** es un proyecto de dos pantallas conectadas que simula el acceso a un sistema administrativo, sin backend real:

- **`login.html`**: pantalla de acceso con formulario de correo y contraseña, validados con la librería `utileria.js`. Si las credenciales coinciden con un usuario registrado, se guarda una sesión simulada y se redirige a `index.html`.
- **`index.html`**: panel interno con sidebar, navbar y formularios funcionales (captura de usuarios y registro de alumnos), protegido por sesión: si no hay una sesión activa, redirige automáticamente de vuelta a `login.html`.

Todo el diseño sigue un lenguaje visual **Soft UI (Neumorphism)**: tarjetas con sombras suaves, fondo gris claro y acentos en azul, construido sobre **Bootstrap 5** como base de estilos.

---

## Demo en vivo

El proyecto está desplegado en GitHub Pages:

**[https://raciel7u7.github.io/sistema-login/login.html](https://raciel7u7.github.io/sistema-login/login.html)**

Usuarios de prueba para iniciar sesión:

| Correo | Contraseña |
|---|---|
| `admin@escuela.cl` | `Admin123!` |
| `ana.perez@escuela.cl` | `Ana1234!` |
| `luis.chavez@escuela.cl` | `Luis1234!` |

---

## Instalación y ejecución local

No requiere gestor de paquetes ni build tools: es HTML, CSS y JavaScript, compatible con cualquier navegador moderno.

1. Clona el repositorio:
   ```bash
   git clone git@github.com:Raciel7u7/sistema-login.git
   ```
2. Abre `login.html` directamente en el navegador
3. Inicia sesión con alguno de los usuarios de prueba, o registra uno nuevo desde **Usuarios > Captura** dentro del panel y vuelve a `login.html` para probarlo.

---

## Explicación y documentación técnica

### Framework CSS

Se utilizó **Bootstrap 5.3.8** como base (grid, modal y botones), combinado con CSS propio para el estilo Soft UI/Neumorphism. No se mezcló con otros frameworks de CSS ni de JS.

### Flujo de login hacia el sistema

1. El usuario llena el formulario de `login.html`. `login.js` valida el formato de correo y contraseña con `validarCorreo` y `validarPassword` de `utileria.js`.
2. Si el formato es correcto, se compara contra una lista de usuarios simulados **y** contra los usuarios capturados previamente desde el panel (guardados en `localStorage`).
3. Si hay coincidencia, se guarda un objeto de sesión en `localStorage` bajo la clave `utileriaUsuarioActivo`:
   ```js
   { correo, nombre, rol, fechaAcceso }
   ```
4. El usuario es redirigido a `index.html`.

### Cómo se pasa el nombre de usuario del login al navbar

Al cargar `index.html`, `index.js` lee `localStorage.getItem('utileriaUsuarioActivo')`, lo parsea y usa el campo `nombre` para:

- Mostrarlo en el navbar, junto con su inicial en el avatar circular.
- Mostrarlo en la tarjeta de bienvenida de la sección Inicio.

Si no existe ninguna sesión guardada, `index.js` redirige automáticamente a `login.html` (protección de acceso). Al cerrar sesión desde el dropdown del navbar, se elimina la clave `utileriaUsuarioActivo` y se regresa a `login.html`.

### Captura de usuarios y su relación con el login

Desde **Usuarios > Captura** en el panel, se puede registrar un nuevo usuario (nombre, correo, contraseña), validado con `soloLetras`, `validarCorreo` y `validarPassword`. Al guardarse correctamente, el usuario se agrega a un arreglo en `localStorage` (`utileriaUsuariosCapturados`), que `login.js` también consulta al iniciar sesión — por lo que un usuario recién capturado puede usarse para iniciar sesión de inmediato, mientras persista esa información en el navegador.

### Registro de alumnos y modal de edad

En **Alumnos**, se captura nombre, número de control (validado con `validarLongitud`, exactamente 6 dígitos) y fecha de nacimiento. Al enviar el formulario, se calcula la edad con `calcularEdad` y se determina si es mayor de edad con `esMayorDeEdad`, mostrando el resultado en un modal de Bootstrap.

---

## Métodos principales de `utileria.js`

| Método | Descripción |
|---|---|
| `validarCorreo(correo)` | Verifica que el correo tenga un formato básico válido (usuario@dominio). |
| `soloLetras(texto)` | Verifica que el texto contenga solo letras, acentos, eñe y espacios. |
| `validarLongitud(valor, maxLongitud)` | Verifica que la longitud de un valor no exceda un máximo dado. |
| `calcularEdad(fechaNacimiento)` | Calcula la edad en años a partir de una fecha de nacimiento. |
| `esMayorDeEdad(fechaNacimiento)` | Devuelve `true` si la edad calculada es mayor o igual a 18. |
| `validarPassword(password)` | Verifica que la contraseña tenga mayúscula, minúscula, número, símbolo y mínimo 8 caracteres. |
| `limpiarEspacios(texto)` | Elimina espacios al inicio/final y reduce espacios múltiples a uno solo. |
| `generarPasswordFuerte(longitud)` | Genera una contraseña aleatoria seguro que cumple `validarPassword`. |

---

## Proceso de creación

**1. Login (`login.html` + `login.js`)**
Se construyó el formulario con validación en tiempo real (al perder el foco) para correo y contraseña, mostrando mensajes de error o de éxito por campo. Se agregó un botón para mostrar/ocultar la contraseña y un checkbox de "Recordarme".

![Login](img/login.png)

**2. Sidebar (`index.html`)**
Se creó un menú lateral colapsable mediante el botón hamburguesa del navbar: colapsado muestra solo íconos, expandido muestra íconos + texto. El submenú de **Usuarios > Captura** se despliega con una animación de altura.

![Sidebar](img/sidebar.png)

**3. Navbar con nombre de usuario**
El navbar lee la sesión activa guardada por `login.js` y muestra el nombre del usuario junto con un menú desplegable con la opción "Salir del sistema".

![Navbar](img/navbar.png)

**4. Número de control y modal de edad**
El formulario de Alumnos valida el número de control (6 dígitos exactos) y, al enviarse correctamente, abre un modal con la edad calculada y si el alumno es mayor o menor de edad.

![Modal de edad](img/modal-edad.png)

---

## Estructura del repositorio

```
nombre-del-repositorio/
├── README.md
├── login.html
├── index.html
├── css/
│   └── login.css
│   ├── index.css
├── js/
│   ├── utileria.js
│   ├── login.js
│   └── index.js
└── img/
    └──
```

---

## Capturas de pantalla

### Flujo completo: login → panel → cierre de sesión
![Flujo completo](img/flujo-completo.png)

### Captura de usuarios
![Captura de usuarios](img/captura-usuarios.png)

### Registro de alumnos y modal de edad
![Registro de alumnos](img/registro-alumnos.png)
![Registro de alumnos](img/modal-alumnos.png)

---

## Tecnologías utilizadas

- HTML5
- CSS3 
- JavaScript 
- Bootstrap Icons
- GitHub Pages para el despliegue

---

## Limitaciones conocidas

- La autenticación es completamente simulada en el cliente: no hay backend ni base de datos, por lo que no debe usarse como sistema de login en producción.
- Los usuarios capturados desde el panel se guardan en `localStorage`, por lo que solo están disponibles en el mismo navegador donde se capturaron (no se sincronizan entre dispositivos).

---

## Participación del equipo

División de trabajo:

- **Chavez Hernandez Luis Eduardo**: login.html, login.css, login.js, validaciones de acceso
- **Cruz Bautista Mauricio Raciel**: index.html, sidebar, navbar, modal de edad, formularios de captura

---

## Autores

- **[Chavez Hernandez Luis Eduardo](https://github.com/ChavezHernandezLuisEduardo)**
- **[Cruz Bautista Mauricio Raciel](https://github.com/Raciel7u7)**