'use strict';

const video = document.getElementById('video');
const snap = document.getElementById("btn2");
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');
const $btnDescargar = document.querySelector("#btn2");
const $btn = document.querySelector("#btn_registrar");
const $dni = document.getElementById("dni").value;

const constraints = {
audio: true,
video: {
width: 300, height: 300
}
};

// Acceso a la webcam
async function init() {
try {
const stream = await navigator.mediaDevices.getUserMedia(constraints);
handleSuccess(stream);
} catch (e) {
errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
}
}
// Correcto!
function handleSuccess(stream) {
window.stream = stream;
video.srcObject = stream;
}
// Load init
init();
// Dibuja la imagen
var context = canvas.getContext('2d');
// snap.addEventListener("click", function() {
//     context.drawImage(video, 0, 0, 300, 300);
// });

// Listener del botón
$btnDescargar.addEventListener("click", () => {
    // Crear un elemento <a>
    context.drawImage(video, 0, 0, 300, 300);
    let enlace = document.createElement('a');
    // El título
    var fec = new Date(),
     mes=fec.getMonth()+1,
     dia=fec.getDate();
     var doc=document.getElementById("dni").value;
    enlace.download = mes+"-"+dia+"-"+doc+".png";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    //enlace.href = canvas.toDataURL();
    enlace.href = canvas.toDataURL();
    // Hacer click en él
    enlace.click();
    document.getElementById("btn_registrar").click()
});