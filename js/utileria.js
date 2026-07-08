//utileria.js de Chavez Herndandez Luis Eduardo
// 1. Validar correo electrónico
function validarCorreo(correo) {//declaramos funcion y esta lista para recibir un dato correo
    const verificado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//establecemos una logica de correo con el arroba y el punto y el abecedario completo de caracteres
    //en forma de string
    return verificado.test(correo); // para posteriormente con .test esperar un booleano dandole el dato correo y que verifique que cumpla con el patron basico establecido
}

// 2. Validar solo letras (con acentos, eñe y espacios)
function soloLetras(texto) { // de igual manera establecemos a recibir y llamar texto al dato, 
    const verificado = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;//posteriormente establecemos los alfabetos permitidos esta vez sin patron, para hacer la revision de que sean solo letras osea lo que establecimos como correcto dentro de nuestro string
    return verificado.test(texto);//nos apoyamos de test para hacer la revision y comparacion entre le dato y los alfabetos den uestro string
}

// 3. Validar longitud de un número (como texto)
function validarLongitud(numero, maxLongitud) {// para la longitud de un numero, la funcion esta hecha para ser flexible a establecerla recibe un dat y un valor para establecer el maxlong
    return String(numero).length <= maxLongitud;// hacemos una comparacion directa en return para devolver solamente un booleano con ayuda de .length
}

// 4. Calcular edad a partir de fecha de nacimiento
function calcularEdad(fechaNacimiento) {//funcion solicita parametro fecha de nacimiento como parametro date
    const nacimiento = new Date(fechaNacimiento); //almacenamos en un objeto date
    const hoy = new Date(); //creamos un contenedor para igual solicitar al navegador la fecha actual
    let edad = hoy.getFullYear() - nacimiento.getFullYear();// calculamos la edad restando usando directamente los anios
    const mes = hoy.getMonth() - nacimiento.getMonth(); // y para obtener los meses hacemos un proceso similar pero ahora resta de mes a mes
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--; 
    }
    return edad;//regresamos el valor de edad
}

// 5. Verificar si es mayor de edad (>= 18)
function esMayorDeEdad(fechaNacimiento) { //solicitamos fechadenacimiento de tipo date
    return calcularEdad(fechaNacimiento) >= 18; //usamos directamente la comparacion con ayuda de nuestra funcion calcular edad previa para retornar finamlmente un booleano
}

// 6. Validar contraseña fuerte
function validarPassword(password) {// solicitamos el valor password
    const contrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]).{8,}$/; //establecemos un patron de estructura 
    return contrasenia.test(password);// usamos test para comparar el patron y el dato cumpla con lo establecido, y regresar un booleano
}


// 7. Limpiar espacios: elimina espacios al inicio/final y reduce múltiples a uno
function limpiarEspacios(texto) {// recibimos un texto o cadena
    return String(texto).trim().replace(/\s+/g, ' '); // y con ayuda de trim().replace limpiamos la cadena de espacios dobles o extras que hallan sido introducidos por error
} //devolviendo un texto con espacios correctamente establecidos. 

// 8. Generar contraseña fuerte aleatoria 
function generarPasswordFuerte(longitud) {// recibimos la longitud para generar la contrasena segura
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiales = '!@#$%^&*()_+-=[]{};:,.<>?';
    const todos = mayusculas + minusculas + numeros + especiales;
//se establecen los valores para nuestra sintaxis de contrasena especificando los alfabetos a utilizar
    let password = '';// difinir variable.
    password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    password += minusculas[Math.floor(Math.random() * minusculas.length)];
    password += numeros[Math.floor(Math.random() * numeros.length)];
    password += especiales[Math.floor(Math.random() * especiales.length)];
// creacion de aleatoriedad de valores para introducir en la cadena que sera la contrasena segura
    for (let i = 4; i < longitud; i++) {
        password += todos[Math.floor(Math.random() * todos.length)];
    }//a la contrasenia empezamos a introducir hasta la longitud deseada

    // Mezclar para que no empiece siempre con mayúscula y regresamos directamente un resultado
    return password.split('').sort(() => Math.random() - 0.5).join(''); //usamos sort con split para hacer la mezcla por la ayuda de que convierte en un arreglo de caracteres split y devolvemos el valor al finalizar
}