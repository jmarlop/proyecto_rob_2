// Crear cliente MQTT (usando WebSockets)
const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
  clientId: 'mqttx_dcbf89f' + parseInt(Math.random() * 1000),
  username: 'PR2'
});

// Al conectar exitosamente
client.on('connect', function () {
  console.log('✅ Conectado a MQTT con MQTT.js');
});

// Si hay un error de conexión
client.on('error', function (error) {
  console.log('❌ Error de conexión MQTT:', error);
});

// Enviar pedido (solo si conectado)
function enviarPedido(tipo, cantidad) {
  if (!client.connected) {
    console.warn("⚠️ No conectado al broker MQTT. Pedido no enviado.");
    return;
  }

  const pedido = JSON.stringify({ tipo, cantidad });
  const topicBase = 'Ropa/';
  const validTipos = ['camiseta', 'pantalon', 'chaqueta'];

  if (validTipos.includes(tipo)) {
    const topic = topicBase + tipo;
    client.publish(topic, pedido, function (err) {
      if (err) {
        console.log('❌ Error al publicar el mensaje:', err);
      } else {
        console.log(`📤 Pedido enviado a ${topic}: ${pedido}`);
      }
    });
  } else {
    console.warn(`⚠️ Tipo de pedido inválido: ${tipo}`);
  }
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
