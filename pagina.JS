document.addEventListener("DOMContentLoaded", function() {
    const url = "https://jmarlop.github.io/proyecto_rob_2/";
  
    // Generar el QR en el canvas
    QRCode.toCanvas(document.getElementById('qr'), url, function(error) {
      if (error) console.error(error);
      console.log('¡QR generado!');
    });
  
    // Mostrar título al hacer clic en el botón
    document.getElementById("btnMostrar").addEventListener("click", function() {
      const titulo = document.getElementById("titulo");
      titulo.style.opacity = 1;
      titulo.style.transition = "opacity 2s ease-in";
    });
  });
  