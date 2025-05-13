document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("Texto_Desaparecer");
  const nombre = document.getElementById("Nombre_Empresa");

  // Hacer aparecer el texto inicial
  texto.style.animation = "aparecer 2s ease-in forwards";

  function manejarClick() {
    // Desaparecer el texto con la animación
    texto.style.animation = "desaparecer 2s ease-in-out forwards";

    texto.addEventListener("animationend", function handler() {
      texto.style.display = "none";
      nombre.classList.add("aparece"); // Activamos la animación del nombre
      texto.removeEventListener("animationend", handler);
    });

    // Evitar múltiples clics
    document.removeEventListener("click", manejarClick);
    document.removeEventListener("touchstart", manejarClick);
  }

  document.addEventListener("click", manejarClick);
  document.addEventListener("touchstart", manejarClick);
});


  
  // Confirmar las selecciones de ropa (esta parte no se modificó)
  document.getElementById('confirmarCamiseta').addEventListener('click', () => {
    alert('Has confirmado una camiseta.');
  });
  
  document.getElementById('confirmarPantalon').addEventListener('click', () => {
    alert('Has confirmado un pantalón.');
  });
  
  document.getElementById('confirmarChaqueta').addEventListener('click', () => {
    alert('Has confirmado una chaqueta.');
  });
  
  document.getElementById('confirmarPantalon').addEventListener('click', () => {
    alert('Has confirmado un pantalón.');
  });
  
  document.getElementById('confirmarChaqueta').addEventListener('click', () => {
    alert('Has confirmado una chaqueta.');
  });