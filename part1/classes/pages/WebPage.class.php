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
    public function __construct(string $title, $header, $css) {
        $this->title = $title;
        $this->header = $header;
        $this->css = $css;
    }

    /**
     * Grab the title of the page.
     *
     * @return string The title of the page.
     */
    public function getTitle() {
        return $this->title;
    }

    /**
     * Grab the header of the page.
     *
     * @return string The header of the page.
     */
    public function getHeader() {
        return $this->header;
    }

    /**
     * Grab the associated CSS file to the page.
     *
     * @return string The CSS of the page.
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