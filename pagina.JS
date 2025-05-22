
// Tu código principal aquí (crear escena, cámara, cargar modelos, etc.)



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
  const validTipos = ['Camiseta', 'Pantalon', 'Sudadera'];

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


// transicion del titulo
document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("Texto_Desaparecer");
  const nombreEmpresa = document.getElementById("Nombre_Empresa");
  const body = document.body;

  // Bloquea scroll y eventos del resto
  body.style.overflow = "hidden";

  function desaparecerTexto() {
    if (texto) {
      texto.classList.add("elevar_desaparecer");

      setTimeout(() => {
        texto.style.display = "none";

        // Mostrar el resto de la página
        nombreEmpresa.style.display = "block";
        void nombreEmpresa.offsetWidth;
        nombreEmpresa.classList.add("elevar_aparece");

        // Habilitar scroll/interacciones
        body.style.overflow = ""; // restablece scroll
      }, 1000);
    }

    document.removeEventListener("click", desaparecerTexto);
    document.removeEventListener("touchstart", desaparecerTexto);
  }

  document.addEventListener("click", desaparecerTexto);
  document.addEventListener("touchstart", desaparecerTexto);
});



// Aparicion desde la izquierda
//separar luego los botones
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.aparicion_lateral');

  // Para hacer aparecer al entrar viewport (desde izquierda)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aparicion_lateral_visible');
        entry.target.classList.remove('desaparece_derecha');
      } else {
        // Cuando se salga del viewport, quitamos clase visible
        entry.target.classList.remove('aparicion_lateral_visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  // Scroll para controlar desaparición por la derecha cuando está arriba
  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
  
      // ✅ Si el elemento ya ha pasado completamente por arriba, lo ocultamos hacia la izquierda
      if (rect.bottom < 0) {
        el.classList.add('desaparece_derecha');
        el.classList.remove('aparicion_lateral_visible');
      }
  
      // ✅ Si vuelve a entrar en pantalla (desde abajo), lo mostramos de nuevo con animación
      else if (rect.top >= 0 && rect.top < window.innerHeight) {
        el.classList.remove('desaparece_derecha');
        el.classList.add('aparicion_lateral_visible');
      }
    });
  });
});

  // Botones y eventos pedidos (sin cambios)
  document.getElementById('confirmarCamiseta').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadCamisetas').value) || 1;
    enviarPedido('Camiseta', cantidad);
  });

  document.getElementById('confirmarPantalon').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadPantalones').value) || 1;
    enviarPedido('Pantalon', cantidad);
  });

  document.getElementById('confirmarSudadera').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidadSudaderas').value) || 1;
    enviarPedido('Sudadera', cantidad);
  });

//aparecion desde la derecha
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.aparicion_lateral_reves');

  // Para hacer aparecer al entrar viewport (desde izquierda)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aparicion_lateral_visible_reves');
        entry.target.classList.remove('desaparece_reves');
      } else {
        // Cuando se salga del viewport, quitamos clase visible
        entry.target.classList.remove('aparicion_lateral_visible_reves');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  // Scroll para controlar desaparición por la derecha cuando está arriba
  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
  
      // ✅ Si el elemento ya ha pasado completamente por arriba, lo ocultamos hacia la izquierda
      if (rect.bottom < 0) {
        el.classList.add('desaparece_reves');
        el.classList.remove('aparicion_lateral_visible_reves');
      }
  
      // ✅ Si vuelve a entrar en pantalla (desde abajo), lo mostramos de nuevo con animación
      else if (rect.top >= 0 && rect.top < window.innerHeight) {
        el.classList.remove('desaparece_reves');
        el.classList.add('aparicion_lateral_visible_reves');
      }
    });
  });  
});

// animacion de los cuadros
document.addEventListener("DOMContentLoaded", () => {
  const cuadros = document.querySelectorAll(".cuadro");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const cuadro = entry.target;

      // Si el cuadro entra en el viewport, gira hacia la cara trasera
      if (entry.isIntersecting) {
        cuadro.classList.add("volteado");
      } else {
        // Si el cuadro está a punto de desaparecer por arriba o abajo
        const rect = cuadro.getBoundingClientRect();
        const isLeavingTop = rect.bottom < 0;
        const isLeavingBottom = rect.top > window.innerHeight;

        if (isLeavingTop || isLeavingBottom) {
          cuadro.classList.remove("volteado");
        }
      }
    });
  }, {
    threshold: 0.2 // sensibilidad: 20% visible activa el giro
  });

  cuadros.forEach(cuadro => {
    observer.observe(cuadro);
  });
});
//activacion de los objetos 3D

// Crear escena, cámara y renderer
/*
function crearVisor3D(contenedorSelector, rutaModelo, ancho=400, alto=300) {
  const contenedor = document.querySelector(contenedorSelector);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, ancho / alto, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(ancho, alto);
  contenedor.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  camera.position.set(0, 1.5, 3);

  const loader = new GLTFLoader();
  loader.load(
    rutaModelo,
    (gltf) => {
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error('Error cargando el modelo:', error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
crearVisor3D('.posicion-1', 'modelos/modelo1.glb');
crearVisor3D('.posicion-2', 'modelos/modelo2.glb');
crearVisor3D('.posicion-3', 'modelos/modelo3.glb');
*/




