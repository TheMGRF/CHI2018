<?php
namespace pages;

/**
 * Creates a HTML webpage based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
class FillableWebPage extends WebPage {

    private $content;

    /**
     * FillableWebPage constructor.
     *
     * @param string $content The path route for the page
     * @param string $title The title of the page
     * @param string $header The header to display on the page
     * @param string $css A specific style sheet to link
     */
    public function __construct($title, $header, $css, $content) {
        parent::__construct($title, $header, $css);
        $this->content = $content;
    }

    /**
     * @return false|string
     */
    public function getPage() {
        return $this->content;
    }


}
?>