<?php
include_once 'classes/pages/WebPage.class.php';
include_once 'classes/pages/FillableWebPage.class.php';
include_once 'classes/pages/RoutedWebPage.class.php';
include_once 'classes/Router.class.php';

$target = isset($_GET["page"]) ? $_GET["page"] : "documentation";
$page = new Router($target);
echo $page->getPage();
?>