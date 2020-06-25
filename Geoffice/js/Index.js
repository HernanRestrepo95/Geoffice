validarSesion();
$(document).ready(function () {
	
	$('#gestionProfesores').click(function () {
		gestionProfesores();
	});
	
    $("#gestionOficinas").click(function () {
		gestionarOficinas();
    });
});

function gestionProfesores(){
	$("#loadModalLog").modal('show');
	$.ajax({
		type: "GET",
		url: "frm/gestionarProfesores.html",
		dataType: "html",
		success: function (data) {
			$('#main-page').html(data);
			$("#loadModalLog").modal('hide');
		}
	});
}

function gestionarOficinas(){
	$("#loadModalLog").modal('show');
	$.ajax({
		type: "GET",
		url: "frm/gestionarOficinas.html",
		dataType: "html",
		success: function (data) {
			$('#main-page').html(data);
			$("#loadModalLog").modal('hide');
		}
	});
}