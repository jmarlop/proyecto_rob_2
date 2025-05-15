// Crear cliente MQTT
const client = new Paho.MQTT.Client("broker.emqx.io", 1883, "webclient_" + parseInt(Math.random() * 1000));

// Función que se llama al conectar correctamente
function onConnect() {
  console.log("Conectado a MQTT");
}

// Función que se llama si falla la conexión MQTT
function onFailure(error) {
  console.error("Error de conexión MQTT:", error);
  // Aquí solo logueamos el error, no interrumpimos nada
}

// Conectar con manejo explícito de error
client.connect({
  userName: "PR2",
  onSuccess: onConnect,
  onFailure: onFailure
});

// Función para enviar pedido MQTT solo si conectado
function enviarPedido(tipo, cantidad) {
  if (!client.isConnected()) {
    console.warn("No conectado al broker MQTT. Pedido no enviado.");
    return;
  }
  const pedido = JSON.stringify({ tipo, cantidad });
  const message = new Paho.MQTT.Message(pedido);
  message.destinationName = "Ropa";
  client.send(message);
}

// Primer DOMContentLoaded: Animaciones de texto
document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("Texto_Desaparecer");

  function desaparecerTexto() {
    if (texto) {
      texto.style.display = "none";
      document.removeEventListener("click", desaparecerTexto);
      document.removeEventListener("touchstart", desaparecerTexto);
      const nombreEmpresa = document.getElementById("Nombre_Empresa");
      nombreEmpresa.classList.add("aparece");
      nombreEmpresa.style.display = "block";
    }
  }

  document.addEventListener("click", desaparecerTexto);
  document.addEventListener("touchstart", desaparecerTexto);
});

// Segundo DOMContentLoaded: IntersectionObserver y listeners de botones
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll('.aparicion_lateral');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aparicion_lateral_visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

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
