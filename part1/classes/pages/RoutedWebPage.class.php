<?php
namespace pages;

/**
 * Creates a HTML webpage based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
class RoutedWebPage extends WebPage {

    private $route;

    /**
     * RoutedWebPage constructor.
     *
     * @param string $route The path route for the page
     * @param string $title The title of the page
     * @param string $header The header to display on the page
     * @param string $css A specific style sheet to link
     */
    public function __construct($route, $title, $header, $css) {
        parent::__construct($title, $header, $css);
        $this->route = $route;
    }

    /**
     * @return string
     */
    public function getRoute() {
        return $this->route;
    }

    /**
     * @return false|string
     */
    public function getPage() {
        return file_get_contents($this->route);
    }


}
?>