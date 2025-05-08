

// Confirmar las selecciones de ropa
document.getElementById('confirmarCamiseta').addEventListener('click', () => {
    alert('Has confirmado una camiseta.');
});
  
document.getElementById('confirmarPantalon').addEventListener('click', () => {
    alert('Has confirmado un pantalón.');
});
  
document.getElementById('confirmarChaqueta').addEventListener('click', () => {
    alert('Has confirmado una chaqueta.');
});

// Esperamos a que el contenido esté cargado para ocultar el texto
document.addEventListener("DOMContentLoaded", function () {
    const texto = document.getElementById("Texto_Desaparecer");
    const nombreEmpresa = document.getElementById("Nombre_Empresa");

    // Función que maneja la transición del texto
    function iniciarTransicion() {
        if (texto) {
            texto.style.opacity = "0";
            setTimeout(() => {
                texto.style.display = "none";
                nombreEmpresa.classList.add("aparece");  // Esta es la animación de la empresa
            }, 500); // Eliminamos el texto después de 0.5 segundos
        }

        document.body.style.transition = "background 3s ease-in-out";
        document.body.style.background = "linear-gradient(to bottom, #fcb045, #fd1d1d, #833ab4)"; // Cambio de fondo

        // Evita que se repita
        document.removeEventListener("click", iniciarTransicion);
        document.removeEventListener("touchstart", iniciarTransicion);
    }

    // Asegurarnos de que el evento de clic esté bien registrado
    document.addEventListener("click", iniciarTransicion);
    document.addEventListener("touchstart", iniciarTransicion);
});
  
