<?php
global $SQL_CNN;

define("_DB_SERVER_", "localhost");
define("_DB_PORT_", "3306");
define("_DB_NAME_", "geoffice");
define("_DB_USER_", "root");
define("_DB_PWD_", "0000");
define("_STR_PSQL_", "mysql:host=" . _DB_SERVER_ . ";port=" . _DB_PORT_ . ";dbname=" . _DB_NAME_);

$SQL_CNN = new PDO(_STR_PSQL_, _DB_USER_, _DB_PWD_);
$SQL_CNN->setAttribute(PDO::ATTR_PERSISTENT, TRUE);

?>