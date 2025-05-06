// Generar el QR pero no mostrarlo (canvas está oculto con CSS)
const url = "https://jmarlop.github.io/proyecto_rob_2/";
QRCode.toCanvas(document.getElementById('qr'), url, function (error) {
  if (error) console.error(error);
  console.log('¡QR generado!');
});

// Mostrar el título al hacer click (opcional)
document.getElementById("btnMostrar").addEventListener("click", function() {
  const titulo = document.getElementById("titulo");
  titulo.style.opacity = 1;
  titulo.style.transition = "opacity 2s ease-in";
});


  