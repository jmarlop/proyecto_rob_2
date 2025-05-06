document.getElementById("btnMostrar").addEventListener("click", function() {
    const titulo = document.getElementById("titulo");
    titulo.style.opacity = 1;  // Hace que el título sea visible.
    titulo.style.transition = "opacity 2s ease-in";  // Animación suave.
  });