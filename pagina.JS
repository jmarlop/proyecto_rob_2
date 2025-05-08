document.addEventListener("DOMContentLoaded", function () {
    const textoDesaparecer = document.getElementById("Texto_Desaparecer");
    const nombreEmpresa = document.getElementById("Nombre_Empresa");
  
    // Asegurarse de que Nombre_Empresa esté inicialmente oculto
    if (nombreEmpresa) {
      nombreEmpresa.style.display = "none";
    }
  
    function iniciarTransicion() {
      if (textoDesaparecer) {
        textoDesaparecer.style.opacity = "0";
        setTimeout(() => {
          textoDesaparecer.style.display = "none";
          // Mostrar Nombre_Empresa al hacerlo visible
          if (nombreEmpresa) {
            nombreEmpresa.style.display = "block"; // Asegura que se muestre
            nombreEmpresa.classList.add("aparece");
          }
        }, 500);
      }
  
      // Cambiar el fondo solo después de hacer clic o tocar
      document.body.style.transition = "background 3s ease-in-out";
      document.body.style.background = "linear-gradient(to bottom, #fcb045, #fd1d1d, #833ab4)";
  
      // Evita que se repita
      document.removeEventListener("click", iniciarTransicion);
      document.removeEventListener("touchstart", iniciarTransicion);
    }
  
    // Escucha el primer clic o toque para iniciar la transición
    document.addEventListener("click", iniciarTransicion);
    document.addEventListener("touchstart", iniciarTransicion);
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