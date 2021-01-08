<?php

use pages\FillableWebPage;
use pages\JsonWebPage;
use pages\RoutedWebPage;

/**
 * This Router will return api endpoints or the documentation page
 *
 * @author Thomas Griffiths (W18013094)
 */
class Router {

    private $page;

    /**
     * Router constructor to create URLs paths and arguments.
     */
    public function __construct() {
        $url = $_SERVER["REQUEST_URI"];
        $path = parse_url($url)['path'];

        $path = str_replace(BASEPATH, "", $path);
        $pathArr = explode('/', $path);

        $path = (empty($pathArr[2])) ? "main" : $pathArr[2];

        header("Access-Control-Allow-Origin: *");

        ($path == "api") ? $this->api_route($pathArr) : $this->html_route($path);
    }

    /**
     * Set the page API route
     *
     * @param array $pathArr The API path route
     */
    public function api_route(array $pathArr) {
        $this->page = new JsonWebPage($pathArr);
    }

    /**
     * set the HTML page route
     *
     * @param string $path The HTML page route
     */
    public function html_route(string $path) {
        $ini['routes'] = parse_ini_file("config/routes.ini",true);
        $pageInfo = isset($path, $ini['routes'][$path])
            ? $ini['routes'][$path]
            : $ini['routes']['error'];

        $this->page = new RoutedWebPage($pageInfo['route'], $pageInfo['title'], $pageInfo['heading1'], $pageInfo['title']);
    }

    /**
     * Get the page content
     *
     * @return mixed The page content
     */
    public function getPage() {
        return $this->page->getPage();
    }
}
?>