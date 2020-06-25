<?php
class Tools {
	public static function getService(){
		$json_string = $_POST['request'];
		$obj = json_decode($json_string);	
		$sbAction;
		if(!empty($obj->service)){
			$sbAction = $obj->service;
		}
		return $sbAction;
	}
	
	public static function getParams(){
		$json_string = $_POST['request'];
		$obj = json_decode($json_string);
		$rcParams;
		if(!empty($obj->params)){
			$rcParams = array($obj->params);
			return $rcParams[0];
		}
		else{
			return "";
		}
		
	}
	
	public static function response($param, $message){
		return json_encode(array(
			'success' => $param,
			'data' => $message
		));
	}
	
	public static function GenerarToken(){
		$cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		$longitudCadena=strlen($cadena);

		$pass = "";
		$longitudPass=50;

		for($i=1 ; $i<=$longitudPass ; $i++){
			$pos=rand(0,$longitudCadena-1);
			$pass .= substr($cadena,$pos,1);
		}
		return $pass;
	}
}
?>