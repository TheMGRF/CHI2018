<?php

use database\JSONRecordSet;



/**
 * Auto load the PHP classes into the application
 *
 * @param string $className The class to load
 */
function autoLoadClasses(string $className) {
    $fileName = "classes\\" . strtolower($className) . ".class.php";
    $fileName = str_replace("\\", DIRECTORY_SEPARATOR, $fileName);
    if (is_readable($fileName)) {
        include_once $fileName;
    } else {
        exit("File not found: " . $className . " (" . $fileName . ")");
    }
}

/**
 * Create a new exception handler
 * Send user friendly JSON error message to visitor
 * Send full error to the DB through {@see logError()}
 *
 * @param $e The error to pass
 */
function exceptionHandler($e) {
    $msg = array("status" => "500", "message" => $e->getMessage(), "file" => $e->getFile(), "line" => $e->getLine());
    $usr_msg = array("status" => "500", "message" => "Sorry! An error has occurred!");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST");
    echo json_encode($usr_msg);
    logError($msg, true);
}

/**
 * Log errors into a error log file or
 * the SQL database
 *
 * @param array $msg The error to log
 * @param bool $database Whether to log to DB or file
 */
function logError(array $msg, bool $database) {
    if ($database) {
        $db = new JSONRecordSet(DATABASE);

        $query = "INSERT INTO errors (errorMsg) VALUES (:name)";
        $params = ["name" => $msg];
        $res = $db->getJSONRecordSet($query, $params);
    } else {
        $logError = fopen("logs/errorLogs.txt", "w");
        fwrite($logError, (string) $msg);
        fclose($logError);
    }
}

set_exception_handler('exceptionHandler');
//set_error_handler('exceptionHandler');

spl_autoload_register("autoLoadClasses");

$ini['main'] = parse_ini_file("config.ini",true);
$ini['routes'] = parse_ini_file("routes.ini",true);

define('BASEPATH', $ini['main']['paths']['basepath']);
define('CSSPATH', $ini['main']['paths']['css']);
define('DATABASE', $ini['main']['database']['dbname']);
define('JWTKEY', $ini['main']['auth']['jwtkey'])

?>