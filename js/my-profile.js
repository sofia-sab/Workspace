document.addEventListener('DOMContentLoaded', function() { 
    const formProfile = document.getElementById('formProfile'); // formulario 
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profilePic');

    loadProfileData();

    formProfile.addEventListener('submit', function(e) {
        e.preventDefault();
        if (formProfile.checkValidity()) {
            saveProfileData();
            Swal.fire('Perfil actualizado con éxito');
            
        } else {
            formProfile.reportValidity();
        }
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
            document.getElementById('email').value = email; // Primero se carga el campo de email
            
            // Cargar la imagen del usuario
            const storedProfilePic = localStorage.getItem(`profilePic_${email}`);
            profilePic.src = storedProfilePic || 'img/img_perfil.png'; // Cargar imagen 
    
            // Cargar datos de perfil del usuario
            const profileData = JSON.parse(localStorage.getItem(`profileData_${email}`)) || {};
            for (const [key, value] of Object.entries(profileData)) {
                const inputElement = document.getElementById(key);
                if (inputElement) {
                    inputElement.value = value; //se carga el resto de informacion
                }
            }
        }
    }
    
    function saveProfileData() {
        const email = document.getElementById('email').value; 
        const profileData = {
            name: document.getElementById('name').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            scdLastName: document.getElementById('scdLastName').value,
            phone: document.getElementById('phone').value
        };
        localStorage.setItem(`profileData_${email}`, JSON.stringify(profileData)); // Guardar con el email
        localStorage.setItem('persona', email); 
    }
});
