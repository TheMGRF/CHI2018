<?php
namespace pages;

/**
 * Creates a HTML web page based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
class FillableWebPage extends WebPage {

    private $content;

    /**
     * FillableWebPage constructor to assign variables and set the page content
     * from the constructor passed parameter.
     *
     * @param string $title The title of the page
     * @param string $header The header to display on the page
     * @param string $css A specific style sheet to link
     * @param string $content The path route for the page
     */
    public function __construct($title, $header, $css, $content) {
        parent::__construct($title, $header, $css);
        $this->content = $content;
    }

    /**
     * Get the page content
     *
     * @return false|string The page content
     */
    public function getPage() {
        return $this->content;
    }

}
?>