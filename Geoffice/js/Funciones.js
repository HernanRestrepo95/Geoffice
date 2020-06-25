//valida la sesion 
function validarSesion(){
		
	//obtiene usuario del ssesionStorge
	usuarioSesion = getSesion('sessionUsuario');
		if (usuarioSesion==null){
			alert("Usuario No Autenticado");
			//llama  la funcion que muestra el menu
			parent.location="index.php";
		}
}//fin del metodo validarSesion
//funcion que permite mostrar un mensaje

//valida la sesion 
function redirigirUs(){

	usuarioSesion = getSesion('sessionUsuario');
	if (usuarioSesion!=null){
		//llama  la funcion que muestra el menu
		parent.location="login.php";
	}
}

 function mostrarMensaje(mensaje, id) {
 	var contenedorMensajes = document.getElementById(id);
	contenedorMensajes.innerHTML = mensaje;	
}//fin de la funcion mostrarMensjae