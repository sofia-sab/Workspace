document.addEventListener('DOMContentLoaded', function() {
    // Aplicar el modo oscuro si está activado
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }

    // Función para cambiar el modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // Añadir el evento al botón de modo oscuro si existe
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }
});
