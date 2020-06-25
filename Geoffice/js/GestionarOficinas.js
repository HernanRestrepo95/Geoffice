var dtProf;

$("form").keypress(function(e) {
	if (e.which == 13) {
		return false;
	}
});

$("#btnRgstrarProfOfi").click(function () {
	registrarUsuarioOfi();
});

dtProf = $('#oficinaProfesor').dataTable( {
	"language": {
		"url": "utils/Spanish.json"
	},
	columns: [
		{ title: "<center>Nombre</center>" },
		{ title: "<center>Oficina</center>" },
		{ title: "<center>Opciones</center>"}
	]
} );
getProfesoresOfic();
$('#selectProfesor').select2();
$('#selectOficina').select2();
getProfesoresSin();
getOficinas();

function registrarUsuarioOfi()
{
	var profesor = $("#selectProfesor").val();
    var oficina = $("#selectOficina").val();
    var sbMensaje = 'Complete los siguientes campos:</br>';
    var blSubmit = true;

    if (profesor == '0' && oficina == '0') {
        sbMensaje = "Complete Todos Los Campos";
        blSubmit = false;
    }//fin del if

    //valida si la caja de texto usuario esta vacia
    else if (profesor == '0') {
        sbMensaje += " - Profesor</br>";
        blSubmit = false;
    }//fin del else

    else if (oficina == '0') {
        sbMensaje += " - Oficina</br>";
        blSubmit = false;
    }//fin del else
    if (blSubmit)
    {	
		$("#loadModalLog").modal('show');
		$.ajax({
			//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
			url: dir+"/GeofficeServer/geofficeService.php",
			dataType : 'json',
			type: "POST",
			data: {request: JSON.stringify({service: "updateProfesor", params:{id: profesor,id_oficina: oficina}})},
			//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
			success: function (data) {
				if (data.success) {
					getProfesoresOfic();
					getProfesoresSin();
					getOficinas();
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

function getProfesoresOfic() {
	$.ajax({
		//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
		url: dir+"/GeofficeServer/geofficeService.php",
		dataType : 'json',
		type: "POST",
		data: {request: JSON.stringify({service: "getProfesoresOfic"})},
		//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
		success: function (data) {
			if (data.success) {
				var listP = new Array();
				$.each(data.data, function( index, value ) {
					var list = new Array();
					$.each(value, function( index2, valueP ) {
						list.push(valueP);
					});
					var aux = "<center><button data-toggle='tooltip' title='Eliminar' type='button' class='btn btn-danger' onClick ='eliminar("+list[0]+");'><i class='fa fa-trash-o'></i></button></center>";
					list.splice(0, 1);
					list.push(aux);
					listP.push(list);
				});
				dtProf.fnClearTable();
				dtProf.fnAddData(listP);
				dtProf.fnDraw();
				
				$('[data-toggle="tooltip"]').tooltip(); 
			}else{
				dtProf.fnClearTable();
				dtProf.fnDraw();
			}
		},
		error: function (data) {
			swal(
				'Oops...',
				data.data,
				'error'
			);
		}
	});
}

function getProfesoresSin() {
	$.ajax({
		url: dir+"/GeofficeServer/geofficeService.php",
		dataType : 'json',
		type: "POST",
		data: {request: JSON.stringify({service: "getProfesoresSin"})},
		success: function (data) {
			if (data.success) {
				$("#selectProfesor").empty();

				var option = $("<option></option>");
					$.each(data.data, function (i) {
						option = $("<option></option>");
						option.val(data.data[i].id);
						option.text(data.data[i].nombre);
						$("#selectProfesor").append(option);
					});
				$("#selectProfesor").select2('destroy'); //refresh the select here
				$("#selectProfesor").select2();
			}else{
				$("#selectProfesor").empty();
				option = $("<option></option>");
				option.val("0");
				option.text("No hay registros");
				$("#selectProfesor").append(option);
				$("#selectProfesor").select2('destroy');
				$("#selectProfesor").select2();
			}
		},
		error: function (data) {
			swal(
				'Oops...',
				data.data,
				'error'
			);
		}
	});
}

function getOficinas() {
	$.ajax({
		url: dir+"/GeofficeServer/geofficeService.php",
		dataType : 'json',
		type: "POST",
		data: {request: JSON.stringify({service: "getOficinas"})},
		success: function (data) {
			if (data.success) {
				$("#selectOficina").empty();

				var option = $("<option></option>");
					$.each(data.data, function (i) {
						option = $("<option></option>");
						option.val(data.data[i].id);
						option.text(data.data[i].id);
						$("#selectOficina").append(option);
					});
				$("#selectOficina").select2('destroy'); //refresh the select here
				$("#selectOficina").select2();
			}else{
				$("#selectOficina").empty();
				option = $("<option></option>");
				option.val("0");
				option.text("No hay registros");
				$("#selectOficina").append(option);
				$("#selectOficina").select2('destroy');
				$("#selectOficina").select2();
			}
		},
		error: function (data) {
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
			data: {request: JSON.stringify({service: "updateProfesor", "params":{"id": idParam, "id_oficina":"0"}})},
			//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
			success: function (data) {
				if (data.success) {
					getProfesoresOfic();
					getProfesoresSin();
					getOficinas();
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
	  }
	});
}