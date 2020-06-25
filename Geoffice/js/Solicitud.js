//const dir = "http://192.168.1.138:8081";
//const dir = "http://198.27.127.144:9504";
//const dir = "http://190.99.137.234";
//const dir = "190.99.182.187";
//const dir = "http://encuestasipac.usc.edu.co";
const dir = "http://131.196.212.65";
var id = "";
var nombre = "";
var email = "";
var token = "";

$(document).ready(function () {
	id = getParameterByName('id');
	nombre = getParameterByName('nombre');
	email = getParameterByName('email');
	token = getParameterByName('token');
	$("#loadModalLog").modal('hide');
	validarToken(id,token);
	
	$("#texto").html("<center><h3>El estudiante " + nombre + " solicita acceso, \n Usted desea :</h3></center>");
	
	$("#btnAprobar").click(function () {
		setSolicitudEstado(1);
	});
	$("#btnAgendar").click(function () {
		setSolicitudEstado(2);
	});
	$("#btnDenegar").click(function () {
		setSolicitudEstado(0);
	});
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setSolicitudEstado(a)
{
	$("#loadModalLog").modal('show');
	$.ajax({
			//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
			url: dir+"/GeofficeServer/geofficeService.php",
			dataType : 'json',
			type: "POST",
			data: {request: JSON.stringify({service: "validarTokenRecuperacion", params:{id: id, token: token}})},
			success: function (data) {
				if (data.success) {
					var obj = JSON.parse(JSON.stringify(data.data[0]));
					var estado = obj.estado;
					if(estado==0){
						$("#loadModalLog").modal('hide');
						swal({
							  title: 'Oops...',
							  text: "El token ha expirado",
							  type: 'error',
							  showCancelButton: false
							}).then(function () {
								window.close();
							});
					}else{
							$.ajax({
							//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
							url: dir+"/GeofficeServer/geofficeService.php",
							dataType : 'json',
							type: "POST",
							data: {request: JSON.stringify({service: "setEstado", params:{id: id,estado: a}})},
							//data: {"request":{"service": "validar", "params":{"usuario": login, "clave": pass}}},
							success: function (data) {
								if (data.success) {
									if(a==2){
										$("#loadModalLog").modal('hide');
										swal({
										  title: 'Buen trabajo!',
										  text: data.data + ", Usted sera redirigido al calendario de Google. Por favor seleccione fecha-hora inicial y final, siguiente guardar y continuar.",
										  type: 'success',
										  showCancelButton: false
										}).then(function () {
											parent.location = "https://calendar.google.com/calendar/render?action=TEMPLATE"+
											"&add="+email+
											"&text=Reunion+Con+Estudiante+"+nombre+
											"&location=Universidad+Santiago+de+Cali";
										});
									}else{
										$("#loadModalLog").modal('hide');
										swal({
										  title: 'Buen trabajo!',
										  text: data.data ,
										  type: 'success',
										  showCancelButton: false
										}).then(function () {
											window.close();
										});
									}
								} else {
									$("#loadModalLog").modal('hide');
									swal({
									  title: 'Oops...',
									  text: data.data,
									  type: 'error',
									  showCancelButton: false
									}).then(function () {
										window.close();
									});
								}
							},
							error: function (data) {
								$("#loadModalLog").modal('hide');
								//muestra mensaje si estuvo bien el procesoo no!
								swal({
								  title: 'Oops...',
								  text: data.data,
								  type: 'error',
								  showCancelButton: false
								}).then(function () {
									window.close();
								});
							}
						});
					}
				} else {
					$("#loadModalLog").modal('hide');
					swal({
					  title: 'Oops...',
					  text: data.data,
					  type: 'error',
					  showCancelButton: false
					}).then(function () {
						window.close();
					});
				}
			},
			error: function (data) {
				$("#loadModalLog").modal('hide');
				//muestra mensaje si estuvo bien el procesoo no!
					swal({
					  title: 'Oops...',
					  text: data.data,
					  type: 'error',
					  showCancelButton: false
					}).then(function () {
						window.close();
					});
			}
	});
}

function validarToken(id,token){
	$("#loadModalLog").modal('show');
	$.ajax({
			//url:"http://hernan.netai.net/ServerTransito/validarUsuario.php",
			url: dir+"/GeofficeServer/geofficeService.php",
			dataType : 'json',
			type: "POST",
			data: {request: JSON.stringify({service: "validarTokenRecuperacion", params:{id: id, token: token}})},
			success: function (data) {
				if (data.success) {
					var obj = JSON.parse(JSON.stringify(data.data[0]));
					var estado = obj.estado;
					if(estado==1){
						$("#loadModalLog").modal('hide');
						swal(
						'Buen trabajo!',
						"Token validado correctamente",
						'success'
						);
					}else{
						$("#loadModalLog").modal('hide');
						swal({
							  title: 'Oops...',
							  text: "El token ha expirado",
							  type: 'error',
							  showCancelButton: false
							}).then(function () {
								window.close();
							});
					}
				} else {
					$("#loadModalLog").modal('hide');
					swal({
					  title: 'Oops...',
					  text: data.data,
					  type: 'error',
					  showCancelButton: false
					}).then(function () {
						window.close();
					});
				}
			},
			error: function (data) {
				$("#loadModalLog").modal('hide');
				//muestra mensaje si estuvo bien el procesoo no!
					swal({
					  title: 'Oops...',
					  text: data.data,
					  type: 'error',
					  showCancelButton: false
					}).then(function () {
						window.close();
					});
			}
	});
}
