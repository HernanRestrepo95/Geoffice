<?php
ini_set("display_errors", "off");
include_once("RouteController.php");
include_once("ApiGeoffice.php");
include_once("Tools.php");

class geofficeService extends RouteController {

	public static function executeValidar() {
		return ApiGeoffice::validar(Tools::getParams());
	}

	public static function executeGetProfesores() {
		return ApiGeoffice::getProfesores(Tools::getParams());
	}

	public static function executeGetOficinas() {
		return ApiGeoffice::getOficinas();
	}

	public static function executeGetRuta() {
		return ApiGeoffice::getRuta(Tools::getParams());
	}

	public static function executeSetProfesor() {
		return ApiGeoffice::setProfesor(Tools::getParams());
	}

	public static function executeUpdateProfesor() {
		return ApiGeoffice::updateProfesor(Tools::getParams());
	}

	public static function executeDeleteProfesor() {
		return ApiGeoffice::deleteProfesor(Tools::getParams());
	}

	public static function executeGetProfesoresOfic() {
		return ApiGeoffice::getProfesoresOfic();
	}

	public static function executeGetProfesoresSin() {
		return ApiGeoffice::getProfesoresSin(Tools::getParams());
	}
	
	public static function executeSetSolicitud() {
		return ApiGeoffice::setSolicitud(Tools::getParams());
	}
	
	public static function executeGetSolicitud() {
		return ApiGeoffice::getSolicitud(Tools::getParams());
	}
	
	public static function executeSetMail() {
		return ApiGeoffice::setMail(Tools::getParams());
	}
	
	public static function executeSetEstado() {
		return ApiGeoffice::setEstado(Tools::getParams());
	}
	
	public static function executeValidarTokenRecuperacion() {
		return ApiGeoffice::validarTokenRecuperacion(Tools::getParams());
	}
}

$objGeofficeService = new geofficeService();
print($objGeofficeService->execute($objGeofficeService, Tools::getService()));
?>