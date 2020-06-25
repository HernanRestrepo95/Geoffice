<?php

ini_set("display_errors", "off");
include_once("config.php");
include_once("Tools.php");

class ApiGeoffice {

	public static function validar($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sql = "select nombre from admin where identificacion = ? and clave = ? ";
		$smtp = $SQL_CNN->prepare($sql);
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ', $rcParams->usuario));
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->clave));
		
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		
		if(!$objData){
		return Tools::response(FALSE,'Usuario/Clave Invalido');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function getProfesores($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sqlComp;
		if(!empty($rcParams->id) && $rcParams->id != null && $rcParams->id != ""){
			$sqlComp = " where id = ?";
		}else{
			$sqlComp = "";
		}
		
		$sql = "select id, nombre, facultad, id_oficina, mail from profesor".$sqlComp;
		
		$smtp = $SQL_CNN->prepare($sql);
		
		if(!empty($rcParams->id) && $rcParams->id != null && $rcParams->id != ""){
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		}
		
		$smtp->execute();
		
		$objData = $smtp->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$objData){
			return Tools::response(FALSE,'No se encontraron registros');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function getOficinas() {
		global $SQL_CNN;
		
		$sql = "select id from oficina where id not in (select id_oficina from profesor where id_oficina is not null)";
		
		$smtp = $SQL_CNN->prepare($sql);
		
		$smtp->execute();
		
		$objData = $smtp->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$objData){
		return Tools::response(FALSE,'No se encontraron registros');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function getRuta($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sql = "select ruta_imagen from oficina where id = ?";
		$smtp = $SQL_CNN->prepare($sql);
		
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		
		if(!$objData){
		return Tools::response(FALSE,'No se encontraron registros');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function setProfesor($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sql = "select count(*) contador from profesor where nombre = ?";
		$smtp = $SQL_CNN->prepare($sql);
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->nombre));
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		if($objData["contador"]>0){
			return Tools::response(FALSE,'Ya existe un profesor con este nombre');
		}else {
			$nuIdx = 1;
			$sqlQuery1 = "insert into profesor (nombre, facultad, id_oficina, mail) values (?,?,null, ?)";
			$smtp = $SQL_CNN->prepare($sqlQuery1);
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->nombre));
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->facultad));
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->correo));
			
			if(!$smtp->execute()){
				return Tools::response(FALSE,'Error al registrar el profesor');
			}

			return Tools::response(TRUE,"Registrado exitosamente");
		}
	}
	
	public static function updateProfesor($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		$sqlCom = array();
		
		$sql = "select count(*) contador from profesor where id = ?";
		$smtp = $SQL_CNN->prepare($sql);
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		if($objData["contador"] == 0){
			return Tools::response(FALSE,'No existe el profesor indicado');
		}if (!empty($rcParams->id_oficina) && $rcParams->id_oficina != null && $rcParams->id_oficina != "" && $rcParams->id_oficina != "0") {
			$nuIdx = 1;
			$sql1 = "select count(*) contador from profesor where id <> ? and id_oficina = ?";
			$smtp = $SQL_CNN->prepare($sql1);
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id_oficina));
			$smtp->execute();
			
			$objData = $smtp->fetch(PDO::FETCH_ASSOC);
			if($objData["contador"] != 0){
				return Tools::response(FALSE,'La oficina ya se encuentra asignada a un profesor');
			}
		}
		if (!empty($rcParams->nombre) && $rcParams->nombre != null && $rcParams->nombre != "") {
			$sqlComp1 = "nombre = ?";
			array_push($sqlCom, $sqlComp1);
		}
		if (!empty($rcParams->facultad) && $rcParams->facultad != null && $rcParams->facultad != "") {
			$sqlComp2 = "facultad = ?";
			array_push($sqlCom, $sqlComp2);
		}
		if (!empty($rcParams->id_oficina) && $rcParams->id_oficina != null && $rcParams->id_oficina != "") {

			if ($rcParams->id_oficina == "0") {
				$sqlComp3 = "id_oficina = null";
				array_push($sqlCom, $sqlComp3);
			} else {
				$sqlComp3 = "id_oficina = ?";
				array_push($sqlCom, $sqlComp3);
			}
		}
		if (!empty($rcParams->correo) && $rcParams->correo != null && $rcParams->correo != "") {
			$sqlComp2 = "mail = ?";
			array_push($sqlCom, $sqlComp2);
		}
		$nuIdx = 1;
		$sqlQuery1 = "update profesor set " . join(',', $sqlCom) . " where id = ?";

		$smtp = $SQL_CNN->prepare($sqlQuery1);
		
		if (!empty($rcParams->nombre) && $rcParams->nombre != null && $rcParams->nombre != "") {
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->nombre));
		}
		if (!empty($rcParams->facultad) && $rcParams->facultad != null && $rcParams->facultad != "") {
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->facultad));
		}
		if (!empty($rcParams->id_oficina) && $rcParams->id_oficina != null && $rcParams->id_oficina != "") {
			if ($rcParams->id_oficina != "0"){
				$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id_oficina));
			}
		}
		if (!empty($rcParams->correo) && $rcParams->correo != null && $rcParams->correo != "") {
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->correo));
		}
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		if(!$smtp->execute()){
			return Tools::response(FALSE,"Error al editar el profesor, Pruebe con otro nombre");
		}

		return Tools::response(TRUE,"Editado exitosamente");
	}
	
	public static function deleteProfesor($rcParams) {
		
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sql = "select count(*) contador from profesor where id = ?";
		$smtp = $SQL_CNN->prepare($sql);
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		if($objData["contador"] == 0){
			return Tools::response(FALSE,'No existe el profesor indicado');
		}else {
			$nuIdx = 1;
			$sqlQuery1 = "delete from profesor where id = ?";
			$smtp = $SQL_CNN->prepare($sqlQuery1);
			$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
			
			if(!$smtp->execute()){
				return Tools::response(FALSE,"Error al eliminar el profesor");
			}
			return Tools::response(TRUE,"Eliminado exitosamente");
		}
	}
	
	public static function getProfesoresOfic() {
		global $SQL_CNN;
		$sql = "select id, nombre, id_oficina from profesor where id_oficina is not null";
		
		$smtp = $SQL_CNN->prepare($sql);
		
		$smtp->execute();
		
		$objData = $smtp->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$objData){
		return Tools::response(FALSE,'No se encontraron registros');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function getProfesoresSin() {
		global $SQL_CNN;
		$sql = "select id, nombre from profesor where id_oficina is null";
		$smtp = $SQL_CNN->prepare($sql);
		
		$smtp->execute();
		
		$objData = $smtp->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$objData){
		return Tools::response(FALSE,'No se encontraron registros');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function setSolicitud($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sqlQuery1 = "insert into solicitud (estado, token, fecha) values (0,?,CURRENT_TIMESTAMP)";
		
		$sbToken = Tools::GenerarToken();

        $smtp = $SQL_CNN->prepare($sqlQuery1);
        $smtp->bindParam($nuIdx++, $sbToken);
		
		if(!$smtp->execute()){
			return Tools::response(FALSE,'Error al registrar la solicitud');
		}
		else{
			$sql = "select max(id) as id from solicitud";
			$smtp = $SQL_CNN->prepare($sql);
			$smtp->execute();
			$objData = $smtp->fetch(PDO::FETCH_ASSOC);
			ApiGeoffice::setMail($rcParams,$objData,$sbToken);
			return Tools::response(TRUE,$objData);
		}
	}
	
	public static function getSolicitud($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sql = "select s.estado, e.descripcion from solicitud s, estado e where s.id = ? and s.estado = e.id;";
		$smtp = $SQL_CNN->prepare($sql);
		
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		
		if(!$objData){
		return Tools::response(FALSE,'No se encontraron registros');
		}

		return Tools::response(TRUE,$objData);
	}
	
	public static function setMail($rcParams, $objData, $sbToken) {
		$para = $rcParams->txtEmailProfesor;
		
		$asunto = "Solicitud de acceso";
		
		$mensaje = "El estudiante ".$rcParams->txtNombre.
		" solicita una reunion con usted. Por favor escoja una de las opciones en el siguiente link ".
		"http://131.196.212.65/solicitud.html?".
		"token=".$sbToken.
		"&id=".$objData["id"].
		"&nombre=".$rcParams->txtNombre.
		"&email=".str_replace('@', '%40',$rcParams->txtEmailEstudiante);
		
		$cabeceras = 'From: geofficewebmaster@gmail.com' . "\r\n" .
		'Reply-To: geofficewebmaster@gmail.com' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();
		if(mail($para, $asunto, $mensaje, $cabeceras)) {
			return "Correo enviado correctamente";
			//return "Correo enviado correctamente";
		} else {
			return "Error al enviar mensaje";
			//return "Error al enviar mensaje";
		}
	}
	
	public static function setEstado($rcParams) {
		global $SQL_CNN;
		$nuIdx = 1;
		
		$sql = "select id from solicitud where id = ?";
		$smtp = $SQL_CNN->prepare($sql);
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ', $rcParams->id));
		
		$smtp->execute();
		
		$objData = $smtp->fetch(PDO::FETCH_ASSOC);
		
		if(!$objData){
			return Tools::response(FALSE,'Id Invalido');
		}
		$nuIdx = 1;
		$sqlQuery1 = "update solicitud set estado = ? where id = ?";
		$smtp = $SQL_CNN->prepare($sqlQuery1);
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->estado));
		$smtp->bindParam($nuIdx++, preg_replace('([^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ@_\.\-\s])', ' ',$rcParams->id));
		
		if(!$smtp->execute()){
			return Tools::response(FALSE,'Error al actualizar el estado de la peticion');
		}
		else{
			return Tools::response(TRUE,'Solicitud actualizada correctamente');
		}
	}
	
	public static function ValidarTokenRecuperacion($rcParams){
        global $SQL_CNN;

        $nuIdx = 1;

        $SQL = "SELECT  
				CASE WHEN ((timediff(CURRENT_TIMESTAMP,tk.fecha) <= '00:03:00') AND (tk.estado = 0)) 
				THEN 1 ELSE 0 END as estado
				FROM solicitud tk
				WHERE tk.id = ?
				AND tk.token = ?;";

        $smtp = $SQL_CNN->prepare($SQL);
		$smtp->bindParam($nuIdx++, $rcParams->id);
        $smtp->bindParam($nuIdx++, $rcParams->token);
        $smtp->execute();

        $objData = $smtp->fetchAll(PDO::FETCH_ASSOC);

		if(!$objData){
		return Tools::response(FALSE,'No se encontraron el token');
		}
		return Tools::response(TRUE,$objData);
	}
	
}
?>