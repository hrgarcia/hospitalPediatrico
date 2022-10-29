function validate(){
    let nombreCompleto = document.getElementById('nombreCompleto').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let consulta = document.getElementById('consulta').value;

    let errorMessage = document.getElementById('errorMessage');
    let errorText;
    
    fullNameFormat = /^[a-zA-Z]+ [a-zA-Z]+$/;
    emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    telefonoFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    errorMessage.style.padding = "10px";  

    if(fullNameFormat.test(nombreCompleto) == false){
        errorText = "Ingrese un nombre valido"
        errorMessage.innerHTML = errorText;
        return false;
    }
    if(emailFormat.test(email) == false){
        errorText = "Ingrese un email valido";
        errorMessage.innerHTML = errorText;
        return false;
    }
    if(telefonoFormat.test(telefono) == false){
        errorText = "Ingrese un telefono valido";
        errorMessage.innerHTML = errorText;
        return false;
    }
    if(consulta.length <= 10){
        errorText = "Ingrese una consulta valida";
        errorMessage.innerHTML = errorText;
        return false;
    }
    alert("Consulta enviada correctamente");
    return true;
}