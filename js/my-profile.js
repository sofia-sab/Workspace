document.addEventListener('DOMContentLoaded', function() { 
    const formProfile = document.getElementById('formProfile'); // formulario 
    const darkModeSwitch = document.getElementById('darkModeSwitch'); // botón cambiar de tema 
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profilePic');

   

    loadProfileData();

    formProfile.addEventListener('submit', function(e) {
        e.preventDefault();
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
                const email = document.getElementById('email').value;
                localStorage.setItem(`profilePic_${email}`, e.target.result); // Guardar imagen con el email
            };
            reader.readAsDataURL(file);
        }
    });

    function loadProfileData() {
        const email = localStorage.getItem('persona');
        if (email) {
            document.getElementById('email').value = email; // Rellenar el campo de email
            
            // Cargar la imagen específica del usuario
            const storedProfilePic = localStorage.getItem(`profilePic_${email}`);
            profilePic.src = storedProfilePic || '/api/placeholder/150/150'; // Cargar imagen o usar placeholder
    
            // Cargar datos de perfil específicos del usuario
            const profileData = JSON.parse(localStorage.getItem(`profileData_${email}`)) || {};
            for (const [key, value] of Object.entries(profileData)) {
                const inputElement = document.getElementById(key);
                if (inputElement) {
                    inputElement.value = value; // Asignar el valor al input
                }
            }
        }
    
        darkModeSwitch.checked = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
    }
    
    function saveProfileData() {
        const email = document.getElementById('email').value; // Obtener el email
        const profileData = {
            name: document.getElementById('name').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            scdLastName: document.getElementById('scdLastname').value,
            phone: document.getElementById('phone').value,
            darkMode: darkModeSwitch.checked
        };
        localStorage.setItem(`profileData_${email}`, JSON.stringify(profileData)); // Guardar con el email
        localStorage.setItem('persona', email); // Actualizar el email
    }
});