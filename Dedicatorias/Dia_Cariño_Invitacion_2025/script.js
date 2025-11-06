document.addEventListener('DOMContentLoaded', function () {
    const celdas = document.querySelectorAll('.celda');
    const dialogo = document.getElementById('dialogo');
    const dialogoMensaje = document.getElementById('dialogo-mensaje');
    const dialogoExtra = document.getElementById('dialogo-extra');
    // Lista de mensajes para los primeros 8 cuadros
    const mensajes = [
        "Eres lo más bonito que me ha pasado ❤️",
        "Cada día me haces más feliz 🌟",
        "Eres el motivo de mi sonrisas 😊",
        "Eres mi persona favorita en el mundo 🌍",
        "Eres mi sueño hecho realidad 💖",
        "Eres mi todo 💕",
        "Eres mi luz en la oscuridad ✨",
        "Eres mi eterno amor 💑"
    ];

    let contadorClicks = 0;

    celdas.forEach(celda => {
        celda.addEventListener('click', function () {
            if (!celda.classList.contains('desactivada')) {
                contadorClicks++;
                celda.classList.add('desactivada'); // Desactiva el cuadro

                if (contadorClicks <= 8) {
                    // Muestra un mensaje de la lista
                    dialogoMensaje.textContent = mensajes[contadorClicks - 1];
                    dialogo.style.display = 'block';
                } else if (contadorClicks === 9) {
                    // Muestra el mensaje especial
                    dialogoMensaje.textContent = "¿Quieres pasar conmigo el 14 de febrero amor? 😍";
                    dialogoExtra.textContent="Aparta también mañana después de clases🤭"
                    dialogo.style.display = 'block';
                }
            }
        });
    });
});

function cerrarDialogo() {
    const dialogo = document.getElementById('dialogo');
    dialogo.style.display = 'none';
}