// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cargar el tema guardado al cargar la página
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Guardar la preferencia en localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


// Contacto.html
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Limpiar errores al escribir en los campos
    const campos = ['nombre', 'email', 'comentarios'];
    campos.forEach(campo => {
        const input = document.getElementById(campo);
        if (input) {
            input.addEventListener('input', () => {
                limpiarError(campo);
            });
        }
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        limpiarTodosLosErrores();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const comentarios = document.getElementById('comentarios').value.trim();
        
        let hayErrores = false;
        
        // Validar nombre
        if (!nombre) {
            mostrarError('nombre', 'El nombre es obligatorio');
            hayErrores = true;
        } else if (nombre.length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
            hayErrores = true;
        }
        
        // Validar email
        if (!email) {
            mostrarError('email', 'El email es obligatorio');
            hayErrores = true;
        } else if (!validarEmail(email)) {
            mostrarError('email', 'Ingrese un email válido');
            hayErrores = true;
        }
        
        // Validar comentarios
        if (!comentarios) {
            mostrarError('comentarios', 'Los comentarios son obligatorios');
            hayErrores = true;
        } else if (comentarios.length < 10) {
            mostrarError('comentarios', 'Los comentarios deben tener al menos 10 caracteres');
            hayErrores = true;
        }
        
        // Si hay errores, detener el envío
        if (hayErrores) {
            return;
        }
        
        // Loguear los datos en consola
        console.log('=== Datos del formulario ===');
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Comentarios:', comentarios);
        console.log('Fecha:', new Date().toLocaleString());
        console.log('===========================');
        
        // Se simula el envío con un spinner y redirección
        mostrarSpinner();
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = 'success.html';
    });
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para mostrar error
function mostrarError(campo, mensaje) {
    const errorElement = document.getElementById(`${campo}-error`);
    const inputElement = document.getElementById(campo);
    
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.classList.add('input-error');
    }
}

// Función para limpiar error de un campo específico
function limpiarError(campo) {
    const errorElement = document.getElementById(`${campo}-error`);
    const inputElement = document.getElementById(campo);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (inputElement) {
        inputElement.classList.remove('input-error');
    }
}

// Función para limpiar todos los errores
function limpiarTodosLosErrores() {
    const campos = ['nombre', 'email', 'comentarios'];
    campos.forEach(campo => limpiarError(campo));
}

// Función para mostrar spinner de carga
function mostrarSpinner() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner"></span> Enviando...';
}
