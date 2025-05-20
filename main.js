import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

function centrarModelo(modelo) {
    const box = new THREE.Box3().setFromObject(modelo);
    const center = box.getCenter(new THREE.Vector3());
    modelo.position.sub(center);
  }
const modelos = [
    { id: 'cuadro1', archivo: './modelos/camiseta.glb' },
    { id: 'cuadro2', archivo: './modelos/pantalones.glb' },
    { id: 'cuadro3', archivo: './modelos/sudadera.glb' }
  ];
  
  function cargarModelos() {
    modelos.forEach(({ id, archivo }) => {
      const contenedor = document.getElementById(id);
      if (!contenedor) {
        console.warn(`Contenedor ${id} no encontrado`);
        return;
      }
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, contenedor.clientWidth / contenedor.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
      contenedor.appendChild(renderer.domElement);
  
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
  
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(5, 10, 7);
      scene.add(dirLight);
  
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
  
      camera.position.set(0, 1.5, 3);
  
      const loader = new GLTFLoader();
      let modelo3D = null;
  
      loader.load(
        archivo,
        (gltf) => {
          modelo3D = gltf.scene;
          configurarModelo(modelo3D, id);
          scene.add(modelo3D);
        },
        undefined,
        (error) => {
          console.error(`Error cargando el modelo ${archivo}:`, error);
        }
      );
  
      function animate() {
        requestAnimationFrame(animate);
        if (modelo3D) {
          modelo3D.rotation.y += 0.01; // Rotación automática sobre sí mismo
        }
        controls.update();
        renderer.render(scene, camera);
      }
  
      animate();
    });
  }
  
  function configurarModelo(modelo, id) {
    switch (id) {
      case 'cuadro1':
        modelo.position.set(0, -27, -20);
        modelo.scale.set(1.5, 1.5, 1.5);
        modelo.rotation.set(0, Math.PI, 0);
        break;
      case 'cuadro2':
        modelo.position.set(0, -1.2, 0);
        modelo.scale.set(1.8, 1.8, 1.8);
        modelo.rotation.set(0, Math.PI / 2, 0);
        break;
      case 'cuadro3':
        modelo.position.set(0, -2, 0);
        modelo.scale.set(1.6, 1.6, 1.6);
        modelo.rotation.set(0, 0, 0);
        break;
    }
  }
  
  document.addEventListener('DOMContentLoaded', cargarModelos);
  
  
  document.addEventListener('DOMContentLoaded', cargarModelos);