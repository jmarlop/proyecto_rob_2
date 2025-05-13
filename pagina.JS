document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("Texto_Desaparecer");

  function desaparecerTexto() {
      if (texto) {
          texto.style.display = "none";  // Desaparece el texto
          document.removeEventListener("click", desaparecerTexto);  // Elimina el evento
          document.removeEventListener("touchstart", desaparecerTexto);
          // Muestra el nombre de la empresa con animación
          document.getElementById("Nombre_Empresa").classList.add("aparece");
          document.getElementById("Nombre_Empresa").style.display = "block";  // Asegúrate de que el nombre de la empresa esté visible
      }
  }

  // Espera a un clic para desaparecer el texto
  document.addEventListener("click", desaparecerTexto);
  document.addEventListener("touchstart", desaparecerTexto);
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