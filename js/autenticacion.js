function checkAuthentication() {
    let username = localStorage.getItem('persona');
    if(!username){
        window.location.href = 'login.html'; 
    
    } else{
        document.getElementById('userShow').textContent=username;
    }
}
document.addEventListener('DOMContentLoaded', checkAuthentication);


document.addEventListener('DOMContentLoaded', function(){

let closeSesion = document.getElementById('closeSesion');


closeSesion.addEventListener('click' , ()=>{
    localStorage.removeItem('persona');
    window.location.href = 'login.html'

});
});


