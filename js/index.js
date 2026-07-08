let totalUsuariosCapturados = 0;
let totalAlumnosCapturados = 0;

document.addEventListener('DOMContentLoaded', () => {
    inicializarSidebar();
    inicializarSubmenuUsuarios();
    inicializarNavegacionSecciones();
    inicializarUsuarioSesion();
    inicializarMenuUsuario();
    inicializarLogout();
    inicializarFormularioCaptura();
    inicializarFormularioAlumno();
});

function inicializarSidebar() {
    const boton = document.getElementById('toggle-sidebar');
    boton.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-abierto');
    });
}

function inicializarSubmenuUsuarios() {
    const toggle = document.getElementById('toggle-usuarios');
    const submenu = document.getElementById('submenu-usuarios');
    const icono = document.getElementById('icono-usuarios');

    toggle.addEventListener('click', (evento) => {
        evento.preventDefault();
        if (!document.body.classList.contains('sidebar-abierto')) {
            document.body.classList.add('sidebar-abierto');
        }
        submenu.classList.toggle('submenu-abierto');
        icono.classList.toggle('chevron-abierto');
    });
}

function inicializarNavegacionSecciones() {
    const enlaces = document.querySelectorAll('[data-seccion]');
    enlaces.forEach((enlace) => {
        enlace.addEventListener('click', (evento) => {
            evento.preventDefault();
            mostrarSeccion(enlace.dataset.seccion);
            marcarEnlaceActivo(enlace);
        });
    });
}

function mostrarSeccion(idSeccion) {
    document.querySelectorAll('.content-section').forEach((seccion) => {
        seccion.classList.add('d-none');
    });

    const seccionActiva = document.getElementById(`seccion-${idSeccion}`);
    if (seccionActiva) {
        seccionActiva.classList.remove('d-none');
    }
}

function marcarEnlaceActivo(enlaceSeleccionado) {
    document.querySelectorAll('.sidebar-link, .sidebar-sublink').forEach((enlace) => {
        enlace.classList.remove('active');
    });
    enlaceSeleccionado.classList.add('active');
}

function inicializarUsuarioSesion() {
    const nombreGuardado = localStorage.getItem('usuarioNombre') || sessionStorage.getItem('usuarioNombre') || 'Invitado';
    const nombreUsuario = limpiarEspacios(nombreGuardado);

    document.getElementById('user-name').textContent = nombreUsuario;
    document.getElementById('user-avatar').textContent = obtenerInicial(nombreUsuario);
    document.getElementById('inicio-usuario-actual').textContent = nombreUsuario;
}

function obtenerInicial(nombre) {
    const nombreLimpio = nombre.trim();
    return nombreLimpio.length > 0 ? nombreLimpio.charAt(0).toUpperCase() : '?';
}

function inicializarMenuUsuario() {
    const boton = document.getElementById('user-menu-toggle');
    const dropdown = document.getElementById('user-dropdown');

    boton.addEventListener('click', (evento) => {
        evento.stopPropagation();
        dropdown.classList.toggle('dropdown-abierto');
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('dropdown-abierto');
    });
}

function inicializarLogout() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('usuarioNombre');
        sessionStorage.removeItem('usuarioNombre');
        window.location.href = 'login.html';
    });
}

function mostrarErrorCampo(elementoId, mensaje) {
    const elemento = document.getElementById(elementoId);
    elemento.textContent = mensaje;
    elemento.classList.add('feedback-error');
    elemento.classList.remove('feedback-ok');
}

function mostrarExitoCampo(elementoId, mensaje) {
    const elemento = document.getElementById(elementoId);
    elemento.textContent = mensaje;
    elemento.classList.add('feedback-ok');
    elemento.classList.remove('feedback-error');
}

function limpiarFeedbackCampo(elementoId) {
    const elemento = document.getElementById(elementoId);
    elemento.textContent = '';
    elemento.classList.remove('feedback-error', 'feedback-ok');
}

function inicializarFormularioCaptura() {
    const formulario = document.getElementById('form-captura');
    const campoPassword = document.getElementById('captura-password');
    const botonGenerar = document.getElementById('btn-generar-password');

    botonGenerar.addEventListener('click', () => {
        campoPassword.value = generarPasswordFuerte(12);
        limpiarFeedbackCampo('feedback-captura-password');
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = limpiarEspacios(document.getElementById('captura-nombre').value);
        const correo = document.getElementById('captura-correo').value.trim();
        const password = campoPassword.value;

        const nombreValido = nombre.length > 0 && soloLetras(nombre);
        const correoValido = validarCorreo(correo);
        const passwordValida = validarPassword(password);

        if (nombreValido) {
            mostrarExitoCampo('feedback-captura-nombre', 'Nombre válido.');
        } else {
            mostrarErrorCampo('feedback-captura-nombre', 'Ingresa un nombre válido, solo letras y espacios.');
        }

        if (correoValido) {
            mostrarExitoCampo('feedback-captura-correo', 'Correo válido.');
        } else {
            mostrarErrorCampo('feedback-captura-correo', 'Ingresa un correo electrónico válido.');
        }

        if (passwordValida) {
            mostrarExitoCampo('feedback-captura-password', 'Contraseña segura.');
        } else {
            mostrarErrorCampo('feedback-captura-password', 'Debe incluir mayúscula, minúscula, número, símbolo y 8+ caracteres.');
        }

        const alerta = document.getElementById('alerta-captura');
        const formularioValido = nombreValido && correoValido && passwordValida;

        if (formularioValido) {
            alerta.textContent = `Usuario ${nombre} registrado correctamente.`;
            alerta.classList.remove('d-none', 'alert-neu-error');
            alerta.classList.add('alert-neu-ok');
            totalUsuariosCapturados += 1;
            document.getElementById('inicio-total-usuarios').textContent = totalUsuariosCapturados;
            formulario.reset();
            limpiarFeedbackCampo('feedback-captura-nombre');
            limpiarFeedbackCampo('feedback-captura-correo');
            limpiarFeedbackCampo('feedback-captura-password');
        } else {
            alerta.textContent = 'Revisa los campos marcados antes de continuar.';
            alerta.classList.remove('d-none', 'alert-neu-ok');
            alerta.classList.add('alert-neu-error');
        }
    });
}

function inicializarFormularioAlumno() {
    const formulario = document.getElementById('form-alumno');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = limpiarEspacios(document.getElementById('alumno-nombre').value);
        const numeroControl = document.getElementById('alumno-control').value.trim();
        const fechaNacimiento = document.getElementById('alumno-nacimiento').value;

        const nombreValido = nombre.length > 0 && soloLetras(nombre);
        const controlSoloDigitos = /^\d+$/.test(numeroControl);
        const controlLongitudValida = validarLongitud(numeroControl, 6) && numeroControl.length === 6;
        const controlValido = controlSoloDigitos && controlLongitudValida;
        const fechaValida = fechaNacimiento.length > 0;

        if (nombreValido) {
            mostrarExitoCampo('feedback-alumno-nombre', 'Nombre válido.');
        } else {
            mostrarErrorCampo('feedback-alumno-nombre', 'Ingresa un nombre válido, solo letras y espacios.');
        }

        if (controlValido) {
            mostrarExitoCampo('feedback-alumno-control', 'Número de control válido.');
        } else {
            mostrarErrorCampo('feedback-alumno-control', 'El número de control debe tener exactamente 6 dígitos.');
        }

        if (fechaValida) {
            mostrarExitoCampo('feedback-alumno-nacimiento', 'Fecha válida.');
        } else {
            mostrarErrorCampo('feedback-alumno-nacimiento', 'Selecciona una fecha de nacimiento.');
        }

        if (!nombreValido || !controlValido || !fechaValida) {
            return;
        }

        const edad = calcularEdad(fechaNacimiento);
        const mayorEdad = esMayorDeEdad(fechaNacimiento);

        mostrarModalEdad(nombre, edad, mayorEdad);
        agregarAlumnoALista(nombre, numeroControl, edad);

        totalAlumnosCapturados += 1;
        document.getElementById('inicio-total-alumnos').textContent = totalAlumnosCapturados;

        formulario.reset();
        limpiarFeedbackCampo('feedback-alumno-nombre');
        limpiarFeedbackCampo('feedback-alumno-control');
        limpiarFeedbackCampo('feedback-alumno-nacimiento');
    });
}

function mostrarModalEdad(nombre, edad, mayorEdad) {
    const cuerpoModal = document.getElementById('modal-edad-body');
    cuerpoModal.textContent = '';

    const parrafoNombre = document.createElement('p');
    parrafoNombre.textContent = `Alumno: ${nombre}`;

    const parrafoEdad = document.createElement('p');
    parrafoEdad.textContent = `Edad calculada: ${edad} años`;

    const parrafoEstado = document.createElement('p');
    parrafoEstado.textContent = mayorEdad ? 'El alumno es mayor de edad.' : 'El alumno es menor de edad.';
    parrafoEstado.classList.add(mayorEdad ? 'texto-exito' : 'texto-advertencia');

    cuerpoModal.append(parrafoNombre, parrafoEdad, parrafoEstado);

    const modalEdad = new bootstrap.Modal(document.getElementById('modalEdad'));
    modalEdad.show();
}

function agregarAlumnoALista(nombre, numeroControl, edad) {
    const lista = document.getElementById('lista-alumnos');
    if (!lista) {
        return;
    }

    const item = document.createElement('li');
    item.className = 'alumno-item';

    const spanNombre = document.createElement('span');
    spanNombre.textContent = nombre;

    const spanControl = document.createElement('span');
    spanControl.textContent = numeroControl;

    const spanEdad = document.createElement('span');
    spanEdad.textContent = `${edad} años`;

    item.append(spanNombre, spanControl, spanEdad);
    lista.prepend(item);
}
