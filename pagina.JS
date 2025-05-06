// Espera a que se haga clic en la pantalla
document.body.addEventListener('click', function() {
    const mensaje = document.getElementById('mensaje');
    
    // Inicia la animación de aparecer y moverse hacia su posición original
    mensaje.style.opacity = '1';
    mensaje.style.transform = 'translateY(0)';
});

  