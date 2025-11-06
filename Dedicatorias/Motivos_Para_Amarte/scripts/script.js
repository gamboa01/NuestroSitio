// Función para establecer una cookie
function setCookie(nombre, valor, dias) {
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    var expiracion = "expires=" + fecha.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}

// Función para obtener el valor de una cookie
function getCookie(nombre) {
    var nombreCookie = nombre + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nombreCookie) == 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    return "";
}

function seMostraronMotivosHoy() {
    const hoy = new Date().toLocaleDateString();
    return localStorage.getItem("ultimaFechaMostrada") === hoy;
}

function guardarFechaMostrada() {
    const hoy = new Date().toLocaleDateString();
    localStorage.setItem("ultimaFechaMostrada", hoy);
}

document.getElementById("dddddfcxv").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        josdgksdjgksdjg();
    }
});

document.getElementById("jjdjjdjdjdjdjd").addEventListener("click", function () {
    josdgksdjgksdjg();
});

function josdgksdjgksdjg(){
    const claveIngresada = document.getElementById("dddddfcxv").value;
    const claveCorrecta = "111223";
    if (claveIngresada === claveCorrecta) {
        document.getElementById("fggggggsdgsdg").style.display = "none";
        document.getElementById("main").style.display = "block";
    } else {
        alert("Clave incorrecta. Inténtalo de nuevo.");
    }
}

document.getElementById("cambiarMotivoBtn").addEventListener("click", function () {

    if (!seMostraronMotivosHoy()) {
        mostrarMotivoAleatorio();
        document.getElementById("cambiarMotivoBtn").disabled = false;
    } else {
        document.getElementById("motivoTexto").innerText = "Hoy ya has visto un motivo. ¡Vuelve mañana para uno nuevo!";
        document.getElementById("titulo").innerText = "Motivo del día";
        document.getElementById("verNuevamente").style.display = "inline";
        document.getElementById("cambiarMotivoBtn").style.display = "none";
        document.getElementById("pie").style.position = "fixed";
        const galeria = document.getElementById("imagenes");
        galeria.innerHTML = "";
    }
    guardarFechaMostrada();
});

document.getElementById("verNuevamente").addEventListener("click", function () {
    const motivo = motivosMostrados[motivosMostrados.length - 1];
    document.getElementById("motivoTexto").innerText = "";
    document.getElementById("titulo").innerText = "Te amo...";
    document.getElementById("verNuevamente").style.display = "none";
    document.getElementById("pie").style.position = "fixed";
    mostrarImagen(motivo);
});

const motivos = [
    "Por tu forma de ser",
    "Por tu sonrisa hermosa",
    "Por tus detalles",
    "Por tus abrazos",
    "Por tus besos",
    "Por ser mi apoyo",
    "Por estar conmigo cuando lo necesito",
    "Por ser atenta",
    "Por escucharme",
    "Por la manera en la que tratas a las personas",
    "Por tu sentido del humor",
    "Por ser una persona en quien puedo confiar",
    "Por ser valiente en todo momento",
    "Por ser mi chica fuerte",
    "Por tu creatividad",
    "Por verme con ojos de amor",
    "Por tus caricias",
    "Por tu humildad",
    "Por la forma en que me amas",
    "Por tu amabilidad",
    "Por ser muy respetuosa",
    "Por aceptarme",
    "Por tomar mi mano",
    "Por compartir tus sueños conmigo",
    "Por dibujar una sonrisa en mi rostro al verte",
    "Por compartir parte de tu vida conmigo",
    "Por ser especial para mí",
    "Por amar a Dios sobre todo",
    "Por ser fiel a sus convicciones",
    "Por como tratas a los niños"
];



let motivosMostrados = [];
const cookieMotivosMostrados = getCookie("motivosMostrados");

if (cookieMotivosMostrados) {
    try {
        motivosMostrados = JSON.parse(cookieMotivosMostrados);
        console.log(motivosMostrados)
    } catch (error) {
        console.error("Error al parsear la cookie de motivos mostrados:", error);
    }
}

function EncontrarFaltantes(motivosLista) {
    let devolucion = [];
    for (let i = 0; i < motivosLista.length; i++) {
        let motivoEncontrado = false;
        for (let j = 0; j < motivosMostrados.length; j++) {
            if (motivosLista[i] === motivosMostrados[j]) {
                motivoEncontrado = true;
                break;
            }
        }
        if (!motivoEncontrado) {
            devolucion.push(motivosLista[i]);
        }
    }
    return devolucion;
}


function mostrarMotivoAleatorio() {
    const motivosNoMostrados = EncontrarFaltantes(motivos);
    console.log(motivosNoMostrados)

    if (motivosNoMostrados.length === 0) {
        document.getElementById("motivoTexto").innerText = "Ya has visto todos los motivos.\nTe Amo Mi Amorcito";
        document.getElementById("cambiarMotivoBtn").style.display = "none";
        document.getElementById("verNuevamente").style.display="none";
        const galeria = document.getElementById("imagenes");
        galeria.innerHTML = "";
        document.getElementById("pie").style.position = "fixed";
        /*document.getElementById("reset").style.display="inline";*/
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * motivosNoMostrados.length);
    const indiceMotivo = motivosNoMostrados[indiceAleatorio];
    
    console.log(indiceAleatorio)
    console.log(indiceMotivo)
        motivosMostrados.push(indiceMotivo);
        document.getElementById("titulo").innerText = "Te amo...";
        mostrarImagen(indiceMotivo);
        setCookie("motivosMostrados", JSON.stringify(motivosMostrados), 30);

}


function mostrarImagen(motivo) {
    const galeria = document.getElementById("imagenes");
    galeria.innerHTML = "";
    const imgElement = document.createElement("img");
    const indiceImagen = motivos.indexOf(motivo);
    imgElement.src = `./imagenes/${indiceImagen+1}.png`;
    galeria.appendChild(imgElement);
    document.getElementById("pie").style.position = "relative";
}

document.getElementById("reset").addEventListener("click", function () {
    limpiarMotivosMostrados();
});

function limpiarMotivosMostrados() {
    motivosMostrados=[];
    localStorage.removeItem("ultimaFechaMostrada");
    localStorage.removeItem("motivosMostrados");
    document.getElementById("cambiarMotivoBtn").disabled = false;
}


/*Para Corazones Volando*/
$( document ).ready(function() { 
    var envelope = $('#galeria');
    envelope.click( function() {
        open();
    });
    function open() {
        envelope.addClass("open")
           .removeClass("close");
    }
});