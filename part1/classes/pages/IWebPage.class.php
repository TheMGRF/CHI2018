<?php
namespace pages;

interface IWebPage {

    public function getTitle();

    public function getHeader();

    public function getCSS();

    public function getPage();
}
?>