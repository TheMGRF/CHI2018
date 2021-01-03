<?php

function autoLoadClasses($className) {
    $fileName = "classes\\" . strtolower($className) . ".class.php";
    $fileName = str_replace("\\", DIRECTORY_SEPARATOR, $fileName);
    if (is_readable($fileName)) {
        include_once $fileName;
    } else {
        exit("File not found: " . $className . " (" . $fileName . ")");
    }
}

function exceptionHandler($e) {
    $msg = array("status" => "500", "message" => $e->getMessage(), "file" => $e->getFile(), "line" => $e->getLine());
    $usr_msg = array("status" => "500", "message" => "Sorry! Internal server error");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST");
    echo json_encode($usr_msg);
    logError($msg);
}
set_exception_handler('exceptionHandler');

spl_autoload_register("autoLoadClasses");

$ini['main'] = parse_ini_file("config.ini",true);
$ini['routes'] = parse_ini_file("routes.ini",true);

define('BASEPATH', $ini['main']['paths']['basepath']);
define('CSSPATH', $ini['main']['paths']['css']);
define('DATABASE', $ini['main']['database']['dbname']);

?>