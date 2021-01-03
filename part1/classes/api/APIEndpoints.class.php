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
        $this->addEndpoint(new APIEndpoint("/api/authors", "Get a list of all authors at CHI2018", ["name", "id"], false, "/api/authors?name=Mark&id=1337&limit=5"));
        $this->addEndpoint(new APIEndpoint("/api/contentauthors", "Get content and author IDs with their associated with institutions.", ["contentId", "authorId"], false, "/api/contentauthors?contentId=6145"));
        $this->addEndpoint(new APIEndpoint("/api/slots", "Get all session slots.", ["type", "id", "dayString"], false, "/api/slots?type=SESSION"));
        $this->addEndpoint(new APIEndpoint("/api/users", "Get all website users.", ["username", "email", "admins"], false, "/api/users?username=John"));
        $this->addEndpoint(new APIEndpoint("/api/content", "Get the content abstracts and titles.", ["id"], false, "/api/content?id=6145"));
        $this->addEndpoint(new APIEndpoint("/api/rooms", "Get all available rooms at the convention", ["id"], false, "/api/rooms?id=10042"));
        $this->addEndpoint(new APIEndpoint("/api/sessiontypes", "Get the types of sessions", ["id"], false, "/api/sessiontypes?id=10061"));
        $this->addEndpoint(new APIEndpoint("/api/sessions", "Get all convention sessions and associated IDs", ["sessionId", "typeId", "roomId", "chairId", "slotId"], false, "/api/sessions?sessionId=2375"));
        $this->addEndpoint(new APIEndpoint("/api/sessionids", "Get a list of all session IDs", [], false, "/api/sessionsids?limit=32"));
        $this->addEndpoint(new APIEndpoint("/api/sessionsonday", "Get a list of all session on a specific day", ["day", "sessionId"], false, "/api/sessionsonday?day=Monday"));
        $this->addEndpoint(new APIEndpoint("/api/sessionsbeforeday", "Get a list of session info before a specified day.", ["day"], false, "/api/sessionsbeforeday?day=6"));
        $this->addEndpoint(new APIEndpoint("/api/sessionscontent", "Get session IDs and their content IDs", ["sessionId", "contentId"], false, "/api/sessionscontent?sessionId=2375"));
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