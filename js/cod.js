// Variables para controlar el estado del juego
let vidasJugador = 3;
let vidasEnemigo = 3;
let juegoTerminado = false;
let nombreMascotaJugador = '';
let nombreMascotaEnemigo = '';

// Función principal que inicia el juego al cargar la página
function iniciarJuego() {
    // Asigna eventos de clic a los botones
    document.getElementById('boton-mascota').addEventListener('click', seleccionarMascotaJugador);
    document.getElementById('boton-fuego').addEventListener('click', () => ataqueJugador('FUEGO'));
    document.getElementById('boton-agua').addEventListener('click', () => ataqueJugador('AGUA'));
    document.getElementById('boton-tierra').addEventListener('click', () => ataqueJugador('TIERRA'));
}

// Función para seleccionar la mascota del jugador
function seleccionarMascotaJugador() {
    const inputHipodoge = document.getElementById("Hipodoge");
    const inputCapipepo = document.getElementById("Capipepo");
    const inputRatigueya = document.getElementById("Ratigueya");

    let mascotaJugador = "";
    let rutaImagenJugador = "";

    // Verifica cuál mascota fue seleccionada
    if (inputHipodoge.checked) {
        mascotaJugador = "Hipodoge";
        rutaImagenJugador = "imagenes/Hipodoge.jpg";
    } else if (inputCapipepo.checked) {
        mascotaJugador = "Capipepo";
        rutaImagenJugador = "imagenes/Capipepo.jpg";
    } else if (inputRatigueya.checked) {
        mascotaJugador = "Ratigueya";
        rutaImagenJugador = "imagenes/Ratigueya.jpg";
    } else {
        alert("Por favor selecciona una mascota");
        return; // Sale de la función si no se seleccionó ninguna
    }

    // Guarda el nombre de la mascota y actualiza la interfaz
    nombreMascotaJugador = mascotaJugador;
    document.getElementById("mascota-jugador").textContent = mascotaJugador;
    document.getElementById("imagen-jugador").src = rutaImagenJugador;

    // Selecciona la mascota del enemigo
    seleccionarMascotaEnemigo();
}

// Función que elige una mascota aleatoria para el enemigo
function seleccionarMascotaEnemigo() {
    const mascotas = [
        { nombre: "Hipodoge", imagen: "imagenes/Hipodoge.jpg" },
        { nombre: "Capipepo", imagen: "imagenes/Capipepo.jpg" },
        { nombre: "Ratigueya", imagen: "imagenes/Ratigueya.jpg" },
    ];

    // Escoge una mascota al azar
    const aleatorio = Math.floor(Math.random() * mascotas.length);
    const enemigo = mascotas[aleatorio];

    // Guarda y muestra la mascota del enemigo
    nombreMascotaEnemigo = enemigo.nombre;
    document.getElementById("mascota-enemigo").textContent = enemigo.nombre;
    document.getElementById("imagen-enemigo").src = enemigo.imagen;
}

// Función para generar un número aleatorio entre un rango
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Función que ejecuta un ataque del jugador
function ataqueJugador(ataque) {
    if (juegoTerminado) return; // No hace nada si el juego terminó

    const imagenJugador = document.getElementById('imagen-jugador');
    const imagenEnemigo = document.getElementById('imagen-enemigo');

    // Agrega animación al jugador al atacar
    imagenJugador.classList.add('animar');
    setTimeout(() => imagenJugador.classList.remove('animar'), 300);

    // Genera el ataque del enemigo
    let ataqueEnemigo = ataqueAleatorioEnemigo();

    // Agrega animación al enemigo con un pequeño retraso
    setTimeout(() => {
        imagenEnemigo.classList.add('animar');
        setTimeout(() => imagenEnemigo.classList.remove('animar'), 300);
    }, 300);

    // Evalúa el resultado del combate
    combate(ataque, ataqueEnemigo);
}

// Función que retorna un ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
    let numero = aleatorio(1, 3);
    return numero === 1 ? 'FUEGO' : numero === 2 ? 'AGUA' : 'TIERRA';
}

// Función que compara los ataques y decide quién gana
function combate(ataqueJugador, ataqueEnemigo) {
    if (juegoTerminado) return;

    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    // Determina el resultado del combate
    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("EMPATE", ataqueJugador, ataqueEnemigo);
    } else if (
        (ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA') ||
        (ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO') ||
        (ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA')
    ) {
        crearMensaje("GANASTE", ataqueJugador, ataqueEnemigo);
        vidasEnemigo = Math.max(vidasEnemigo - 1, 0);
        spanVidasEnemigo.textContent = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE", ataqueJugador, ataqueEnemigo);
        vidasJugador = Math.max(vidasJugador - 1, 0);
        spanVidasJugador.textContent = vidasJugador;
    }

    // Verifica si alguno ha perdido todas las vidas
    revisarVidas();
}

// Función que comprueba si el juego ha terminado
function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("🎉 Felicitaciones, GANASTE el juego 🎉");
        juegoTerminado = true;
    } else if (vidasJugador === 0) {
        crearMensajeFinal("😞 Lo siento, PERDISTE el juego 😞");
        juegoTerminado = true;
    }
}

// Muestra el resultado de cada combate
function crearMensaje(resultado, ataqueJugador, ataqueEnemigo) {
    const sectionMensajes = document.getElementById('mensajes');
    sectionMensajes.innerHTML = ''; // Limpia mensajes anteriores

    const parrafo = document.createElement('p');
    parrafo.innerHTML = `${nombreMascotaJugador} atacó con ${ataqueJugador}, ${nombreMascotaEnemigo} atacó con ${ataqueEnemigo} - <strong>${resultado}</strong>`;
    sectionMensajes.appendChild(parrafo);
}

// Muestra el mensaje final al terminar el juego
function crearMensajeFinal(resultadoFinal) {
    const sectionMensajes = document.getElementById('mensajes');
    sectionMensajes.innerHTML = ''; // Limpia mensajes anteriores

    const parrafo = document.createElement('p');
    parrafo.innerHTML = `<strong>${resultadoFinal}</strong>`;
    sectionMensajes.appendChild(parrafo);
}

// Ejecuta la función iniciarJuego una vez que el documento ha cargado completamente
window.addEventListener('load', iniciarJuego);
