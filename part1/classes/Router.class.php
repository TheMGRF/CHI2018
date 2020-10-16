<?php
/**
 * This Router will return api endpoints or the documentation page
 *
 * @author Thomas Griffiths (W18013094)
 * @param $pageType - can be "api" or "documentation"
 *
 */
class Router {
    private $page;

    public function __construct($pageType) {
        switch ($pageType) {
            case 'api':
                // api
                break;
            case 'documentation':
                // documentation
                break;
            default:
                //error
                break;
        }
        $css = "styles/style.css";
        $this->page = new webpage();
        $this->page->addToBody($text);
    }

    public function get_page() {
        return $this->page->get_page();
    }
}
?>