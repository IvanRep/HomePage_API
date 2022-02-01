<?php 
require_once('credentials.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


date_default_timezone_set('Europe/Madrid');
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

$mysqli = new MySQLi($db_host, $db_user, $db_pass, $db_name);

mysqli_set_charset($mysqli, 'uf8');

if ($mysqli->connect_error) {
    die("No se puede conectar con $db_user \nerror: ".$mysqli->connect_error);
}


?>