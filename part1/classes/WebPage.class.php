<?php

/**
 * This Router will return a main, documentation or about page
 *
 * @param $pageType - can be "main", "documentation" or "about"
 *
 * @author YOUR NAME
 */
class Router {

    private $title, $header, $styles;

    /**
     * Router constructor.
     *
     * @param string $title The title of the page
     * @param string $header The header to display on the page
     * @param string $styles A specific style sheet to link
     */
    public function __construct($title, $header, $styles) {
        $this->title = $title;
        $this->header = $header;
        $this->styles = $styles;
    }

    /**
     * @return mixed
     */
    public function getTitle() {
        return $this->title;
    }

    /**
     * @return mixed
     */
    public function getHeader() {
        return $this->header;
    }

    /**
     * @return mixed
     */
    public function getStyles() {
        return $this->styles;
    }


}