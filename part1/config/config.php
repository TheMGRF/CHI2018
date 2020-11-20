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

spl_autoload_register("autoLoadClasses");

$ini['main'] = parse_ini_file("config.ini",true);
$ini['routes'] = parse_ini_file("routes.ini",true);

define('BASEPATH', $ini['main']['paths']['basepath']);
define('CSSPATH', $ini['main']['paths']['css']);
define('DATABASE', $ini['main']['database']['dbname']);

?>