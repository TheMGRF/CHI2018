<?php
include_once 'classes/pages/WebPage.class.php';
include_once 'classes/pages/FillableWebPage.class.php';
include_once 'classes/pages/RoutedWebPage.class.php';
include_once 'classes/Router.class.php';

$target = "";
if (isset($_GET["page"])) {
    $target = $_GET["page"];
} else {
    $target = "documentation";
}

$page = new Router($target);
echo $page->getPage();
?>