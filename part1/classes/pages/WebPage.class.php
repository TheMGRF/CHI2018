<?php
namespace pages;

include_once 'IWebPage.class.php';

/**
 * Creates a HTML webpage based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
abstract class WebPage implements IWebPage, Pageable {

    private $title, $header, $css;

    /**
     * WebPage constructor.
     *
     * @param string $title The title of the page
     * @param string $header The header to display on the page
     * @param string $css A specific style sheet to link
     */
    public function __construct($title, $header, $css) {
        $this->title = $title;
        $this->header = $header;
        $this->css = $css;
    }

    /**
     * @return string
     */
    public function getTitle() {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getHeader() {
        return $this->header;
    }

    /**
     * @return string
     */
    public function getCSS() {
        return $this->css;
    }

    /**
     * Return a form of readable page
     */
    public function getPage() {}
}
?>