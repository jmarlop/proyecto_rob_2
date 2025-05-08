document.addEventListener("DOMContentLoaded", function () {
    const texto = document.getElementById("Texto_Desaparecer");
  
    function desaparecerTexto() {
      if (texto) {
        texto.style.display = "none";
        document.removeEventListener("click", desaparecerTexto);
        document.removeEventListener("touchstart", desaparecerTexto);
      }
    }
  
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