

Instituto Tecnologico de Oaxaca
Programacion Web
Unidad 2
Actividad 5
Proyecto de creacion de un login y index con componentes completos
Equipo 4
Chavez Hernandez Luis Eduardo
Cruz Bautista Mauricio Raziel
Profesora Adelina Martinez Nieto
Grupo
COMPOSICION DEL LOGIN
Flujo del login hacia el sistema

El usuario escribe su correo y contraseña en login.html.
Al perder el foco (blur) o al enviar el formulario, se valida:
Que el campo no esté vacío (mensaje "Este campo es obligatorio.").
Que el formato sea correcto, usando validarCorreo() y validarPassword() de utileria.js.



Si el formato es correcto, se compara el correo y la contrasea contra un arreglo de usuarios simulados definido en login.js (usuariosSimulados), ya que el proyecto no tiene backend real.
Si coincide un usuario:
Se guarda su información en localStorage.
Se muestra el mensaje "Acceso correcto. Redirigiendo…".
Después de ~1 segundo, se redirige a index.html.


Si no coincide, se muestra "Correo o contraseña incorrectos." y ambos campos se marcan en rojo.

Cómo se pasa el nombre de usuario del login al navbar
No se usa ninguna variable global ni un backend: la comunicación entre login.html e index.html se hace con localStorage
utileriaUsuarioActivo

Login (login.html)

Procesos realizados para crear funcionamiento de Login
Se definió la estructura HTML del formulario con dos campos: correo y contraseña, cada uno con su span de error y de "ok".
Se diseñó el layout en dos columnas (panel de marca + panel de formulario) con CSS Grid, usando variables CSS para color y tipografía.
Se agregaron estados visuales de foco, campo vacío, campo inválido y campo válido.
Se conectó la validación de formato con las funciones validarCorreo() y validarPassword() de utileria.js.
Se agregó el arreglo usuariosSimulados para simular una base de datos de acceso.
Se implementó buscarUsuario() para comparar las credenciales ingresadas contra los usuarios simulados.
Al validar correctamente, se guarda la sesión en localStorage y se redirige a index.html.

<img width="1329" height="620" alt="image" src="https://github.com/user-attachments/assets/d2523d58-eb1c-48c8-a58a-2bf71d5d0e6b" />
<img width="1316" height="618" alt="image" src="https://github.com/user-attachments/assets/20d76703-0f25-4692-a9b1-ec20957217de" />
<img width="1352" height="624" alt="image" src="https://github.com/user-attachments/assets/f6eba9ee-5282-47b4-b1b7-258c3ded6b67" />
<img width="1356" height="627" alt="image" src="https://github.com/user-attachments/assets/66339249-0149-4e8d-9f41-bfb43c5864d8" />
<img width="1350" height="643" alt="image" src="https://github.com/user-attachments/assets/eb07c9ed-6301-4d24-8261-c7eaac49e0ec" />
<img width="1341" height="641" alt="image" src="https://github.com/user-attachments/assets/5156f19d-4742-4788-8bb4-0f0df449c11d" />
