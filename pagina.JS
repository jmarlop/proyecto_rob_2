// Conexión MQTT usando Paho MQTT WebSocket
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "webclient_" + parseInt(Math.random() * 1000));

client.connect({
  onSuccess: onConnect,
  onFailure: e => console.log("Error de conexión:", e)
});

function onConnect() {
  console.log("Conectado a MQTT");
}

// Función para enviar pedido con cantidad
function enviarPedido(tipo, cantidad) {
  if (!client.isConnected()) {
    console.error("No conectado al broker MQTT.");
    return;
  }
  const pedido = JSON.stringify({ tipo, cantidad });
  const message = new Paho.MQTT.Message(pedido);
  message.destinationName = "hyperpack/pedido";
  client.send(message);
  alert(`Pedido enviado: ${tipo} x${cantidad}`);
}

// Animaciones y eventos DOM
document.addEventListener("DOMContentLoaded", function () {
  // Texto que desaparece al clic o toque
  const texto = document.getElementById("Texto_Desaparecer");

  function desaparecerTexto() {
    if (texto) {
      texto.style.display = "none";  // Desaparece el texto
      document.removeEventListener("click", desaparecerTexto);
      document.removeEventListener("touchstart", desaparecerTexto);
      // Muestra el nombre de la empresa con animación
      const nombreEmpresa = document.getElementById("Nombre_Empresa");
      nombreEmpresa.classList.add("aparece");
      nombreEmpresa.style.display = "block";
    }
  }

  document.addEventListener("click", desaparecerTexto);
  document.addEventListener("touchstart", desaparecerTexto);

  // Observador para las apariciones laterales
  const elements = document.querySelectorAll('.aparicion_lateral');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aparicion_lateral_visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  elements.forEach(el => observer.observe(el));

  // Eventos para confirmar pedidos y enviar por MQTT
  document.getElementById('confirmarCamiseta').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById("cantidadCamisetas").value) || 1;
    enviarPedido("camiseta", cantidad);
  });

  document.getElementById('confirmarPantalon').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById("cantidadPantalones").value) || 1;
    enviarPedido("pantalon", cantidad);
  });

  document.getElementById('confirmarChaqueta').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById("cantidadChaquetas").value) || 1;
    enviarPedido("chaqueta", cantidad);
  });
});
