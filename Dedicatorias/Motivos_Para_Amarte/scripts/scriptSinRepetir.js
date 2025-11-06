
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

document.getElementById("galeria").addEventListener("click",function(){

})



document.getElementById("cambiarMotivoBtn").addEventListener("click", function () {

    if (motivosMostrados.length!==motivos.length) {
        mostrarMotivoAleatorio();
        document.getElementById("cambiarMotivoBtn").disabled = false;
    } else {
        document.getElementById("titulo").innerText = "Mi sonrisita de luna 🌛";
        document.getElementById("motivoTexto").innerText = "Ya has visto todos los motivos.\nTe Amo Mi Amorcito";
        document.getElementById("cambiarMotivoBtn").style.display = "none";
        document.getElementById("verNuevamente").style.display="none";
        document.getElementById('imagenes').innerHTML = '<iframe src="corazon.html" width="100%" height="100%" frameborder="0"></iframe>';
        document.getElementById('imagenes').style.height="500px";
        document.getElementById("pie").style.position = "fixed";
        document.getElementById("reset").style.display="inline";

    }
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
    if (motivosNoMostrados.length === 0) {
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * motivosNoMostrados.length);
    const indiceMotivo = motivosNoMostrados[indiceAleatorio];

        motivosMostrados.push(indiceMotivo);
        document.getElementById("titulo").innerText = "Te amo...";
        mostrarImagen(indiceMotivo);
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
    location.reload();
});


function agruparCocos(variable){
    var envelope = $('#galeria');
    envelope.click( function() {
            open();
    });
    
    function open() {
        envelope.addClass("open")
           .removeClass("close");
           setTimeout(function () {
            close();
        }, 5000);
    }

    function close() {
        envelope.addClass("close")
           .removeClass("open");
    }
}

/*Para Corazones Volando*/
$( document ).ready(function() { 
    agruparCocos();
});