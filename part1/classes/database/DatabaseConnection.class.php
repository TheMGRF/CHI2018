<?php
namespace database;

use PDO;
use PDOException;

/**
 * Class DatabaseConnection to create the singleton DB getter.
 *
 * @package database
 * @author Thomas Griffiths (W18013094)
 */
class DatabaseConnection {

    private static $dbConnection = null;

    private function __construct() {}

    /**
     * Gets the internal database connection if it exits and
     * if it doesnt creates one then returns it
     *
     * @param string $dbName The name of the database to connect to
     * @return PDO|null
     */
    public static function getConnection($dbName) {
        if (!self::$dbConnection) {
            try {
                self::$dbConnection = new PDO("sqlite:" . $dbName);
                self::$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }

        return self::$dbConnection;
    }


}