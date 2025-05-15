// MQTT (Paho MQTT Client)
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "webclient_" + parseInt(Math.random() * 1000));

client.connect({
  onSuccess: onConnect,
  onFailure: e => console.log("Error de conexión:", e)
});

function onConnect() {
  console.log("Conectado a MQTT");
}

function enviarPedido(tipo, cantidad) {
  if (!client.isConnected()) {
    console.error("No conectado al broker MQTT.");
    return;
  }
  const pedido = JSON.stringify({ tipo, cantidad });
  const message = new Paho.MQTT.Message(pedido);
  message.destinationName = "hyperpack/pedido";
  client.send(message);
}

// Mantener animación y desaparecer texto correctamente
document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("Texto_Desaparecer");

  function desaparecerTexto() {
      if (texto) {
          texto.style.display = "none";  // Desaparece el texto
          document.removeEventListener("click", desaparecerTexto);
          document.removeEventListener("touchstart", desaparecerTexto);
          document.getElementById("Nombre_Empresa").classList.add("aparece");
          document.getElementById("Nombre_Empresa").style.display = "block";
      }
  }

  // Cierre correcto aquí para que las animaciones no fallen
  document.addEventListener("click", desaparecerTexto);
  document.addEventListener("touchstart", desaparecerTexto);
}); // <-- Aquí termina el DOMContentLoaded

// Aquí otro DOMContentLoaded para el IntersectionObserver y los listeners MQTT
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer para las animaciones laterales
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

  // Listeners para enviar el pedido MQTT sin tocar los alertas que ya tienes
  document.getElementById('confirmarCamiseta').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadCamisetas').value) || 1;
    enviarPedido('camiseta', cantidad);
  });

  document.getElementById('confirmarPantalon').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadPantalones').value) || 1;
    enviarPedido('pantalon', cantidad);
  });

  document.getElementById('confirmarChaqueta').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadChaquetas').value) || 1;
    enviarPedido('chaqueta', cantidad);
  });
});
