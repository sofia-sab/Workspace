document.addEventListener('DOMContentLoaded', function() {
    const formProfile = document.getElementById('formProfile'); //formulario 
    const darkModeSwitch = document.getElementById('darkModeSwitch'); //boton cambiar de tema 
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profilePic');

    loadProfileData();

    formProfile.addEventListener('submit', function(e) {
        e.preventDefault();
        formProfile.classList.add('was-validated');

        if (formProfile.checkValidity()) {
            saveProfileData();
            alert('Perfil actualizado con éxito');
        } else {
            formProfile.reportValidity();
        }
    });

    darkModeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeSwitch.checked);
    });

    profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                const storedEmail = document.getElementById('email').value;
                localStorage.setItem(`profilePic_${storedEmail}`, e.target.result); // Guardar imagen con el email
            };
            reader.readAsDataURL(file);
        }
    });

    function loadProfileData() {
        const storedEmail = localStorage.getItem('persona');
        if (storedEmail) {
            document.getElementById('email').value = storedEmail; // Rellenar el campo de email
            
            // Cargar la imagen específica del usuario
            const storedProfilePic = localStorage.getItem(`profilePic_${storedEmail}`);
            profilePic.src = storedProfilePic || '/api/placeholder/150/150'; // Cargar imagen o usar placeholder
        }

        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
        for (const [key, value] of Object.entries(profileData)) {
            if (document.getElementById(key)) {
                document.getElementById(key).value = value;
            }
        }

        darkModeSwitch.checked = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
    }

    function saveProfileData() {
        const profileData = {
            nombre: document.getElementById('name').value,
            segundoNombre: document.getElementById('middleName').value,
            apellido: document.getElementById('lastName').value,
            segundoApellido: document.getElementById('scd-lastname').value,
            telefono: document.getElementById('phone').value,
            darkMode: darkModeSwitch.checked
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
        localStorage.setItem('persona', document.getElementById('email').value); // Actualizar el email
    }
});
