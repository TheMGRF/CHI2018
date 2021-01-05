<?php
namespace database;

use PDO;

class JSONRecordSet extends RecordSet {

    /**
     * Function to return a record set as an associative array
     *
     * @param string $query with sql to execute to retrieve the record set
     * @param array $params associative array of params for preparted statement
     * @return string a json document
     */
    function getJSONRecordSet($query, $params = null) {
        $stmt = $this->getRecordSet($query, $params);
        $recordSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $nRecords = count($recordSet);
        //return json_encode($recordSet); // should be this way :P
        return json_encode(array("status" => 200, "count" => $nRecords, "data" => $recordSet));
    }

}