<?php
namespace api;

class EndpointManager {

    private $apiEndpoints;

    /**
     * EndpointManager constructor.
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