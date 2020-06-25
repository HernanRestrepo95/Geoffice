//const dir = "http://192.168.1.138:8081";
//const dir = "http://198.27.127.144:9504";
//const dir = "http://190.99.137.234";
//const dir = "190.99.182.187";
//const dir = "http://encuestasipac.usc.edu.co";
//const dir = "http://192.168.0.18";
//const dir = "http://131.196.212.65";
const dir = "http://localhost";
$(document).ready(function () {
	
	$("#txtUsuario").focus();
	
	$("#txtUsuario").keypress(function(e) {
		if(e.which == 13) {
			validarUsuario();
		}
	});
	$("#txtClave").keypress(function(e) {
		if(e.which == 13) {
			validarUsuario();
		}
	});


    $('#btnAceptar').click(function () {
        //llamado a funcion que valida el usuario
        validarUsuario();
    });

    $("#closeSession").click(function () {
        cerrarSesion();
    });

});

//funcion para obtener los datos y mostrarlos en el formulario
function validarUsuario() {
	var expreg = /^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\s]+$/;
	
	var usuarioP = $("#txtUsuario").val();
	var claveP = $("#txtClave").val();
	
    var blSubmit = true;
    var sbMensaje = 'Complete los siguientes campos:\n';
    if (usuarioP == '' && claveP == '') {
        sbMensaje = "Complete Todos Los Campos\n";
        blSubmit = false;
    }//fin del if

    //valida si la caja de texto usuario esta vacia
    else if (usuarioP == '') {
        sbMensaje += " - Usuario \n";
        blSubmit = false;
    }//fin del else

    //valida si la caja de texto usuario esta vacia
    else if (claveP == '') {
        sbMensaje += " - Contraseña \n";
        blSubmit = false;
    }//fin del else
		
	if(usuarioP != '' && !usuarioP.match(expreg) && claveP != '' && !claveP.match(expreg)){
		sbMensaje = "Evite el Uso de Caracteres especiales";
		blSubmit = false;
	}
	else if(usuarioP != '' && !usuarioP.match(expreg)){
		sbMensaje = "Evite el Uso de Caracteres especiales - Usuario\n";
		blSubmit = false;
	}
	else if(claveP != '' && !claveP.match(expreg) ){
		sbMensaje = "Evite el Uso de Caracteres especiales - Clave\n";
		blSubmit = false;
	}
    if (blSubmit)
    {	
		$("#loadModalLog").modal('show');
		$.ajax({
			//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
			url: dir+"/GeofficeServer/geofficeService.php",
			dataType : 'json',
			type: "POST",
			data: {request: JSON.stringify({service: "validar", params:{usuario: usuarioP, clave: claveP}})},
			//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
			success: function (data) {
				if (data.success) {
					setSesion(data.data);
					parent.location = "login.php";
				} else {
					$("#loadModalLog").modal('hide');
					swal(
						'Oops...',
						data.data,
						'error'
					);
				}
			},
			error: function (data) {
				$("#loadModalLog").modal('hide');
				swal(
					'Oops...',
					data.data,
					'error'
				);
			}
		});
    } else {
		$("#loadModalLog").modal('hide');
		swal(
			'Oops...',
			sbMensaje,
			'warning'
		);
    }
}

function cerrarSesion(){
	swal({
	  title: '¿Deseas cerrar sesión?',
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si!',
	  cancelButtonText: 'No!',
	  confirmButtonClass: 'btn btn-success',
	  cancelButtonClass: 'btn btn-danger',
	  buttonsStyling: false
	}).then(function () {
		removeSesion('sessionUsuario');
        parent.location = "index.php";
	}, function (dismiss) {
	  // dismiss can be 'cancel', 'overlay',
	  // 'close', and 'timer'
	  if (dismiss === 'cancel') {
		swal(
		  'Cancelado',
		  'Operacion cancelada',
		  'error'
		);
	  }
	});
}
