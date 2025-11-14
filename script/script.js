const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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
    const campos = ['nombre', 'email', 'comentarios'];
    campos.forEach(campo => {
        const input = document.getElementById(campo);
        if (input) {
            input.addEventListener('input', () => {
                limpiarError(campo);
            });
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        limpiarTodosLosErrores();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const comentarios = document.getElementById('comentarios').value.trim();

        let hayErrores = false;

        if (!nombre) {
            mostrarError('nombre', 'El nombre es obligatorio');
            hayErrores = true;
        } else if (nombre.length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
            hayErrores = true;
        }

        if (!email) {
            mostrarError('email', 'El email es obligatorio');
            hayErrores = true;
        } else if (!validarEmail(email)) {
            mostrarError('email', 'Ingrese un email válido');
            hayErrores = true;
        }

        if (!comentarios) {
            mostrarError('comentarios', 'Los comentarios son obligatorios');
            hayErrores = true;
        } else if (comentarios.length < 10) {
            mostrarError('comentarios', 'Los comentarios deben tener al menos 10 caracteres');
            hayErrores = true;
        }

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

        // Mostrar spinner
        mostrarSpinner();

        // Simulo un tiempo de carga para el envío
        setTimeout(() => {
            mostrarAlertaExito();
        }, 2000);
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

function limpiarTodosLosErrores() {
    const campos = ['nombre', 'email', 'comentarios'];
    campos.forEach(campo => limpiarError(campo));
}

function mostrarSpinner() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner"></span> Enviando...';
}

function mostrarAlertaExito() {
    const form = document.getElementById('contact-form');
    const successAlert = document.getElementById('success-alert');
    const successActions = document.getElementById('success-actions');

    if (form && successAlert && successActions) {
        form.style.display = 'none';
        successAlert.style.display = 'flex';
        successActions.style.display = 'block';
    }
}
