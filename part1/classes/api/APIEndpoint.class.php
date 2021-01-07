<?php
namespace api;

/**
 * Class APIEndpoint for storing information related
 * to different API endpoints for easy documentation reasons
 *
 * @package api
 * @author Thomas Griffiths (W18013094)
 */
class APIEndpoint {

    const EXAMPLE_PREFIX = "curl http://localhost/part1";

    private $route, $description, $parameters, $authenticated, $example;

    /**
     * APIEndpoint constructor to assign variables.
     *
     * @param string $route The route of the API endpoint
     * @param string $description A human readable description of what the endpoint does
     * @param array $parameters A list of parameters that can be used on the endpoint
     * @param bool $authenticated Whether or not the endpoint requires authentication
     * @param string $example An example of what the endpoint returns
     */
    public function __construct(string $route, string $description, array $parameters, bool $authenticated, string $example) {
        $this->route = $route;
        $this->description = $description;
        $this->parameters = $parameters;
        $this->authenticated = $authenticated;
        $this->example = $example;
    }

    /**
     * Get the route of the API endpoint
     *
     * @return string The route of the API endpoint
     */
    public function getRoute(): string {
        return $this->route;
    }

    /**
     * Get a human readable description of what the endpoint does
     *
     * @return string The human readable description of what the endpoint does
     */
    public function getDescription(): string {
        return $this->description;
    }

    /**
     * Get a list of parameters that can be used on the endpoint
     *
     * @return array The list of parameters that can be used on the endpoint
     */
    public function getParameters(): array {
        return $this->parameters;
    }

    /**
     * Get whether or not the endpoint requires authentication
     *
     * @return bool If the endpoint requires authentication or not
     */
    public function isAuthenticated(): bool {
        return $this->authenticated;
    }

    /**
     * Get an example of what the endpoint returns
     *
     * @return string An example of what the endpoint returns
     */
    public function getExample(): string {
        return $this::EXAMPLE_PREFIX . (empty($this->example) ? $this->getRoute() : $this->example);
    }

    /**
     * Convert the API endpoint to a JSON string that can be returned in API
     *
     * @return array A JSON formatted string version of the endpoint
     */
    public function toJson(): array {
        return [
            "route" => $this->getRoute(),
            "description" => $this->getDescription(),
            "parameters" => $this->getParameters(),
            "authenticated" => $this->isAuthenticated(),
            "example" => $this->getExample()
        ];
    }

}