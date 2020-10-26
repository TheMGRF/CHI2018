<?php

use pages\FillableWebPage;
use pages\RoutedWebPage;

/**
 * This Router will return api endpoints or the documentation page
 *
 * @author Thomas Griffiths (W18013094)
 */
class Router {
    private $page;

    /**
     * Router constructor.
     *
     * @param $pageType - can be "api" or "documentation"
     */
    public function __construct($pageType) {
        switch ($pageType) {
            case "api": // api
                $this->page = new FillableWebPage("api.html", "api", "API", "<p>Api garbage</p>");
                break;
            case "documentation": // documentation
                $this->page = new RoutedWebPage("documentation.html", "documentation", "Documentation", "api.css");
                break;
            default:
                //error
                break;
        }
    }

    public function getPage() {
        return $this->page->getPage();
    }
}
?>