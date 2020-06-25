var dataP;
var dt;
var idP = "";

$("#txtNombre").focus();

$("form").keypress(function(e) {
	if (e.which == 13) {
		return false;
	}
});

$("#btnRgstrarProf").click(function () {
	registrarUsuario();
});

$("#btnLimpiar").click(function () {
	limpiar();
});

dt = $('#tblProfesores').dataTable( {
	"language": {
		"url": "utils/Spanish.json"
	},
	columns: [
		{ title: "<center>ID</center>" },
		{ title: "<center>Nombre</center>" },
		{ title: "<center>Facultad</center>" },
		{ title: "<center>Correo</center>" },
		{ title: "<center>Opciones</center>"}
	]
} );
getProfesores();
$('#txtFacultad').select2();

function registrarUsuario()
{
	var expreg = /^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\s]+$/;
	
    var nombreP = $("#txtNombre").val();
    var facultadP = $("#txtFacultad").val();
	var correoP = $("#txtCorreo").val();
    var sbMensaje = 'Complete los siguientes campos: </br>';
    var blSubmit = true;

    if (nombreP == '' && facultadP == '' && correoP == '') {
        sbMensaje = "Complete Todos Los Campos";
        blSubmit = false;
    }//fin del if

    //valida si la caja de texto usuario esta vacia
    else if (nombreP == '') {
        sbMensaje += " - Nombre</br>";
        blSubmit = false;
    }//fin del else

    else if (facultadP == '') {
        sbMensaje += " - Facultad</br>";
        blSubmit = false;
    }//fin del else
	
	else if (correoP == '') {
        sbMensaje += " - Correo</br>";
        blSubmit = false;
    }//fin del else

	else if(nombreP != '' && !nombreP.match(expreg)){
		sbMensaje = "Evite el Uso de Caracteres especiales - Nombre\n";
		blSubmit = false;
	}
	
	else if(correoP != '' && !correoP.match(expreg)){
		sbMensaje = "Evite el Uso de Caracteres especiales - Correo\n";
		blSubmit = false;
	}
	
	else if(!validarEmail(correoP)){
		sbMensaje = "Digite un correo valido\n";
		blSubmit = false;
	}
    if (blSubmit)
    {
		$("#loadModalLog").modal('show');
		var service;
		if(idP != null && idP != ""){
			serviceP = "updateProfesor";
		}else{
			serviceP = "setProfesor";
		}
		
		$.ajax({
			//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
			url: dir+"/GeofficeServer/geofficeService.php",
			dataType : 'json',
			type: "POST",
			data: {request: JSON.stringify({service: serviceP, params:{id: idP,nombre: nombreP, facultad: facultadP, correo: correoP}})},
			//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
			success: function (data) {
				if (data.success) {
					limpiar();
					getProfesores();
					$("#loadModalLog").modal('hide');
					swal(
						'Buen trabajo!',
						data.data,
						'success'
					);
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
				//muestra mensaje si estuvo bien el procesoo no!
				$("#loadModalLog").modal('hide');
					swal(
						'Oops...',
						data.data,
						'error'
					);
			}
		});
    } else
    {
		$("#loadModalLog").modal('hide');
		swal(
			'Oops...',
			sbMensaje,
			'warning'
		);
    }
}

function getProfesores() {
	$.ajax({
		//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
		url: dir+"/GeofficeServer/geofficeService.php",
		dataType : 'json',
		type: "POST",
		data: {request: JSON.stringify({service: "getProfesores"})},
		//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
		success: function (data) {
			if (data.success) {
				var listP = new Array();
				$.each(data.data, function( index, value ) {
					var list = new Array();
					$.each(value, function( index2, valueP ) {
						list.push(valueP);
					});
					var aux = "<center><button data-toggle='tooltip' title='Editar' type='button' class='btn btn-primary' onClick ='setVariables("+list[0]+");'><i class='fa fa-pencil'></i></button> <button data-toggle='tooltip' title='Eliminar' type='button' class='btn btn-danger' onClick ='eliminar("+list[0]+");'><i class='fa fa-trash-o'></i></button></center>";
					list.splice(3, 1);
					list.push(aux);
					listP.push(list);
				});
				dt.fnClearTable();
				dt.fnAddData(listP);
				dt.fnDraw();
				
				$('[data-toggle="tooltip"]').tooltip(); 
			}else{
				dt.fnClearTable();
				dt.fnDraw();
			}
		},
		error: function (data) {
			//muestra mensaje si estuvo bien el procesoo no!
			swal(
				'Oops...',
				data.data,
				'error'
			);
		}
	});
}

function setVariables(idParam){
	$("#loadModalLog").modal('show');
	$.ajax({
		//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
		url: dir+"/GeofficeServer/geofficeService.php",
		dataType : 'json',
		type: "POST",
		data: {request: JSON.stringify({service: "getProfesores", "params":{"id": idParam}})},
		//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
		success: function (data) {
			if (data.success) {
				var obj = JSON.parse(JSON.stringify(data.data[0]));
				idP = obj.id;
				$("#txtNombre").val(obj.nombre);
				$("#txtFacultad").val(obj.facultad).trigger('change');;
				$("#txtCorreo").val(obj.mail);
				$("#loadModalLog").modal('hide');
				$('html, body').animate( {scrollTop : 0}, 800 );
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
			//muestra mensaje si estuvo bien el procesoo no!
			$("#loadModalLog").modal('hide');
			swal(
				'Oops...',
				data.data,
				'error'
			);
		}
	});
}

function eliminar(idParam){
	swal({
	  title: '¿Deseas eliminar este registro?',
	  text: "No podras revertir esto!",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, eliminar!',
	  cancelButtonText: 'No, Cancelar!',
	  confirmButtonClass: 'btn btn-success',
	  cancelButtonClass: 'btn btn-danger',
	  buttonsStyling: false
	}).then(function () {
		$("#loadModalLog").modal('show');
		$.ajax({
			//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
			url: dir+"/GeofficeServer/geofficeService.php",
			dataType : 'json',
			type: "POST",
			data: {request: JSON.stringify({service: "deleteProfesor", "params":{"id": idParam}})},
			//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
			success: function (data) {
				if (data.success) {
					limpiar();
					getProfesores();
					$("#loadModalLog").modal('hide');
					swal(
						'Eliminado!',
						data.data,
						'success'
					);
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
				//muestra mensaje si estuvo bien el procesoo no!
				$("#loadModalLog").modal('hide');
				swal(
					'Oops...',
					data.data,
					'error'
				);
			}
		}); 
	}, function (dismiss) {
	  // dismiss can be 'cancel', 'overlay',
	  // 'close', and 'timer'
	  if (dismiss === 'cancel') {
		swal(
		  'Cancelado',
		  'Operacion cancelada',
		  'error'
		);
		limpiar();
	  }
	});
}

function limpiar(){
	$("#txtNombre").val("");
	$("#txtCorreo").val("");
	$('#txtFacultad').prop('selectedIndex',0).trigger('change');;
	idP = "";
}

function validarEmail(email){
	var expreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	if(expreg.test(email)){
		return true;
	}else{
		return false;
	}
}