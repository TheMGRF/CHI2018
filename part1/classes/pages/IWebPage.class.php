<?php
namespace pages;

/**
 * IWebPage interface for creating a base of a web page,
 *
 * @package pages
 * @author Thomas Griffiths (W18013094)
 */
interface IWebPage {

    public function getTitle();

    public function getHeader();

    public function getCSS();
}
?>