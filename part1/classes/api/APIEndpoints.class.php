<?php
namespace api;

class APIEndpoints {

    private $endpoints = [];

    /**
     * APIEndpoints constructor.
     */
    public function __construct() {
        $this->addEndpoint(new APIEndpoint("/api", "The main API page with API specific information.", [], false, "/api"));
        $this->addEndpoint(new APIEndpoint("/api/endpoints", "A list of available API endpoints", [], false, ""));
        $this->addEndpoint(new APIEndpoint("/api/help", "A good meme", [], false, ""));
        $this->addEndpoint(new APIEndpoint("/api/login", "", [], false, ""));
        $this->addEndpoint(new APIEndpoint("/api/logout", "", [], false, ""));
        $this->addEndpoint(new APIEndpoint("/api/update", "", [], false, ""));
        $this->addEndpoint(new APIEndpoint("/api/authors", "Get a list of all authors at CHI2018", ["name", "id"], false, "/api/authors?name=Mark&id=1337"));
    }

    /**
     * Add an endpoint to the list of total API endpoints
     *
     * @param APIEndpoint endpoint $endpoint The endpoint to add
     */
    public function addEndpoint($endpoint) {
        array_push($this->endpoints, $endpoint);
    }

    /**
     * Get a list of all API endpoints
     *
     * @return array A list of all API endpoints
     */
    public function getEndpoints(): array {
        return $this->endpoints;
    }

    /**
     * Get all API endpoints routes as a list
     *
     * @return array A list of all API endpoints
     */
    public function getEndpointsRoutes(): array {
        $routes = [];
        foreach ($this->getEndpoints() as $endpoint) {
            array_push($routes, $endpoint->getRoute());
        }

        return $routes;
    }

    /**
     * Get all API endpoints in a JSON formatted form
     *
     * @return array
     */
    public function getEndpointsJSON(): array {
        $endpoints = [];
        foreach ($this->getEndpoints() as $endpoint) {
            array_push($endpoints, $endpoint->toJSON());
        }

        return $endpoints;
    }

}
?>