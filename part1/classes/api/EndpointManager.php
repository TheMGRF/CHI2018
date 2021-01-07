<?php
namespace api;

/**
 * Class EndpointManager to grab all API endpoints.
 *
 * @package api
 * @author Thomas Griffiths (W18013094)
 */
class EndpointManager {

    private $apiEndpoints;

    /**
     * EndpointManager constructor to create a new instance.
     */
    public function __construct() {
        $this->apiEndpoints = new APIEndpoints();
    }

    /**
     * Get the api endpoints class
     *
     * @return APIEndpoints An instance of the api endpoints class
     */
    public function getApiEndpoints(): APIEndpoints {
        return $this->apiEndpoints;
    }




}