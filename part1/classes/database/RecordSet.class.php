<?php
namespace database;

use PDOStatement;

/**
 * Abstract class that creates a database connection and returns a recordset
 * Follows the recordset pattern
 *
 * @author Thomas Griffiths (W18013094)
 */
abstract class RecordSet {

    protected $dbConn;
    protected $stmt;

    /**
     * RecordSet constructor to establish a DB connection.
     *
     * @param string $dbname The databe name to establish a connection with
     */
    function __construct($dbname) {
        $this->dbConn = DatabaseConnection::getConnection($dbname);
    }

    /**
     * This function will execute the query as a prepared statement if there is a
     * params array. If not, it executes as a regular statement.
     *
     * @param string $query The sql for the recordset
     * @param array $params An optional associative array if you want a prepared statement
     * @return bool|PDOStatement
     */
    function getRecordSet($query, $params = null) {
        if (is_array($params)) {
            $this->stmt = $this->dbConn->prepare($query);
            $this->stmt->execute($params);
        } else {
            $this->stmt = $this->dbConn->query($query);
        }
        return $this->stmt;
    }
}

?>