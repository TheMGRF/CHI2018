<?php
include_once 'classes/pages/WebPage.class.php';
include_once 'classes/pages/FillableWebPage.class.php';
include_once 'classes/pages/RoutedWebPage.class.php';
include_once 'classes/Router.class.php';

$page = new Router($_GET["page"]);
echo $page->getPage();
?>