<?php
class RouteController {
	public static function execute($class, $action) {
		if (is_callable(array($class, 'execute' . $action))) {
		return call_user_func(array($class, 'execute' . $action));
		} else {			
			return Tools::response(FALSE,'El metodo ' . $action . ' no hace parte del modulo ' . get_class($class));
		}
	}
}
?>