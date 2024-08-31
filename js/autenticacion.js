function checkAuthentication() {
    let username = localStorage.getItem('persona');
    if(!username){
        window.location.href = 'login.html'; 
    
    } else{
        document.getElementById('userShow').textContent=username;
    }
}
document.addEventListener('DOMContentLoaded', checkAuthentication);