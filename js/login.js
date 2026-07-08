// login.js — lógica de la pantalla de acceso (login.html)
// Depende de utileria.js: usa validarCorreo() y validarPassword()

document.addEventListener("DOMContentLoaded", function () {
  // ---------- Referencias a elementos ----------
  var form = document.getElementById("loginForm");
  var btnLogin = document.getElementById("btnLogin");
  var feedback = document.getElementById("loginFeedback");

  var correo = document.getElementById("loginCorreo");
  var correoError = document.getElementById("loginCorreoError");
  var correoOk = document.getElementById("loginCorreoOk");

  var password = document.getElementById("loginPassword");
  var passwordError = document.getElementById("loginPasswordError");
  var passwordOk = document.getElementById("loginPasswordOk");

  var togglePassword = document.getElementById("togglePassword");

  // ---------- Usuarios simulados (no hay backend real) ----------
  //USUARIOS SIMULADOS CON LOCALSTORAGE
  var usuariosSimulados = [
    {
      correo: "admin@escuela.cl",
      password: "Admin123!",
      nombre: "Admin General",
      rol: "Administrador",
    },
    {
      correo: "ana.perez@escuela.cl",
      password: "Ana1234!",
      nombre: "Ana Pérez",
      rol: "Usuario",
    },
    {
      correo: "luis.chavez@escuela.cl",
      password: "Luis1234!",
      nombre: "Luis Chávez",
      rol: "Usuario",
    },
  ];

  // Busca un usuario cuyo correo y contraseña coincidan.
  // Devuelve el usuario encontrado, o null si no hay coincidencia.
  function buscarUsuario(correoIngresado, passwordIngresada) {
    for (var i = 0; i < usuariosSimulados.length; i++) {
      var usuario = usuariosSimulados[i];
      if (
        usuario.correo.toLowerCase() === correoIngresado.toLowerCase() &&
        usuario.password === passwordIngresada
      ) {
        return usuario;
      }
    }
    return null;
  }

  // Mensajes por campo: uno para "campo vacío" y otro para "formato inválido"
  var mensajes = {
    correo: {
      vacio: "Este campo es obligatorio.",
      invalido: "Correo inválido. Ejemplo: nombre@correo.cl",
    },
    password: {
      vacio: "Este campo es obligatorio.",
      invalido:
        "Debe tener mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres.",
    },
  };

  // ---------- Utilidades de estado visual ----------

  // Pinta el input de rojo/verde y muestra el mensaje correspondiente.
  // "vacio" indica si el campo está vacío, para mostrar el mensaje de
  // "campo obligatorio" en vez del mensaje de formato inválido.
  function mostrarEstado(
    input,
    errorEl,
    okEl,
    esValido,
    vacio,
    textoVacio,
    textoInvalido,
  ) {
    if (esValido) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      errorEl.style.display = "none";
      okEl.style.display = "inline";
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      errorEl.textContent = vacio ? textoVacio : textoInvalido;
      errorEl.style.display = "block";
      okEl.style.display = "none";
    }
  }

  function limpiarEstado(input, errorEl, okEl) {
    input.classList.remove("is-valid", "is-invalid");
    errorEl.style.display = "none";
    okEl.style.display = "none";
  }

  function mostrarFeedback(texto, tipo) {
    feedback.textContent = texto;
    feedback.classList.remove("is-error", "is-success");
    if (tipo) feedback.classList.add(tipo);
  }

  // ---------- Validación individual de cada campo ----------

  function validarCampoCorreo() {
    var valor = correo.value.trim();
    var vacio = valor.length === 0;
    var esValido = !vacio && validarCorreo(valor);
    mostrarEstado(
      correo,
      correoError,
      correoOk,
      esValido,
      vacio,
      mensajes.correo.vacio,
      mensajes.correo.invalido,
    );
    return esValido;
  }

  function validarCampoPassword() {
    var valor = password.value;
    var vacio = valor.length === 0;
    var esValido = !vacio && validarPassword(valor);
    mostrarEstado(
      password,
      passwordError,
      passwordOk,
      esValido,
      vacio,
      mensajes.password.vacio,
      mensajes.password.invalido,
    );
    return esValido;
  }

  // ---------- Eventos de validación en tiempo real (blur) ----------

  correo.addEventListener("blur", validarCampoCorreo);
  password.addEventListener("blur", validarCampoPassword);

  // Si el usuario ya vio un error y empieza a corregir, limpiamos el
  // estado de "inválido" mientras escribe para no ser intrusivos.
  correo.addEventListener("input", function () {
    if (correo.classList.contains("is-invalid"))
      limpiarEstado(correo, correoError, correoOk);
  });
  password.addEventListener("input", function () {
    if (password.classList.contains("is-invalid"))
      limpiarEstado(password, passwordError, passwordOk);
  });

  // ---------- Mostrar / ocultar contraseña ----------

  togglePassword.addEventListener("click", function () {
    var esTexto = password.getAttribute("type") === "text";
    password.setAttribute("type", esTexto ? "password" : "text");
    togglePassword.setAttribute("aria-pressed", String(!esTexto));
    togglePassword.setAttribute(
      "aria-label",
      esTexto ? "Mostrar contraseña" : "Ocultar contraseña",
    );
  });

  // ---------- Envío del formulario ----------

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var correoValido = validarCampoCorreo();
    var passwordValida = validarCampoPassword();

    // Primero el formato (correo con @ y punto, password segura).
    // Si el formato ya está mal, ni siquiera buscamos el usuario.
    if (!correoValido || !passwordValida) {
      mostrarFeedback("Revisa los campos marcados en rojo.", "is-error");
      var primerError = form.querySelector(".is-invalid");
      if (primerError) primerError.focus();
      return;
    }

    // Con el formato correcto, ahora sí comparamos contra los
    // usuarios simulados (esto reemplaza a un backend real).
    var usuarioEncontrado = buscarUsuario(correo.value.trim(), password.value);

    if (!usuarioEncontrado) {
      mostrarFeedback("Correo o contraseña incorrectos.", "is-error");
      correo.classList.add("is-invalid");
      password.classList.add("is-invalid");
      return;
    }

    // Login correcto: guardamos el usuario "activo" para que
    // index.html lo lea y lo muestre en el navbar.
    // Clave usada en localStorage: "utileriaUsuarioActivo".
    var sesion = {
      correo: usuarioEncontrado.correo,
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol,
      fechaAcceso: new Date().toISOString(),
    };
    localStorage.setItem("utileriaUsuarioActivo", JSON.stringify(sesion));

    mostrarFeedback("Acceso correcto. Redirigiendo…", "is-success");
    btnLogin.disabled = true;
    btnLogin.textContent = "Ingresando…";

    setTimeout(function () {
      window.location.href = "index.html";
    }, 900);
  });
});
