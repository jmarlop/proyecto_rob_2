document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("Texto_Desaparecer");
  const nombre = document.getElementById("Nombre_Empresa");

  // Aplicar animación de aparición + espera automática
  texto.style.animation = "aparecer 2s ease-in forwards";

  // Al hacer clic o tocar, desaparecer el texto y mostrar el nombre
  function manejarClick() {
    texto.style.animation = "desaparecer 2s ease-in-out forwards";

    // Cuando termine la animación de desaparecer...
    texto.addEventListener("animationend", function handler() {
      texto.style.display = "none"; // lo ocultamos
      nombre.classList.add("aparece"); // animamos el nombre

      texto.removeEventListener("animationend", handler); // limpieza
    });

    // Quitar los listeners para no repetir
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