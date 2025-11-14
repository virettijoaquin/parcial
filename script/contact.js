// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const comentarios = document.getElementById('comentarios').value.trim();
        
        // Validaciones
        if (!nombre || nombre.length < 3) {
            alert('Por favor, ingrese un nombre válido (mínimo 3 caracteres)');
            return;
        }
        
        if (!email || !validarEmail(email)) {
            alert('Por favor, ingrese un email válido');
            return;
        }
        
        if (!comentarios || comentarios.length < 10) {
            alert('Por favor, ingrese un comentario válido (mínimo 10 caracteres)');
            return;
        }
        
        // Loguear los datos en consola
        console.log('=== Datos del formulario ===');
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Comentarios:', comentarios);
        console.log('Fecha:', new Date().toLocaleString());
        console.log('===========================');
        
        // Mostrar spinner de carga
        mostrarSpinner();
        
        // Simular envío con delay de 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Redirigir a página de éxito
        window.location.href = 'success.html';
    });
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para mostrar spinner de carga
function mostrarSpinner() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner"></span> Enviando...';
}
