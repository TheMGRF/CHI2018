<?php
include_once 'classes/pages/WebPage.class.php';
include_once 'classes/pages/FillableWebPage.class.php';
include_once 'classes/pages/RoutedWebPage.class.php';
include_once 'classes/Router.class.php';

$target = "";

switch (isset($_GET["page"])) {
    case "api":
        $page = new Router("api");
        break;
    case "documentation":
    default:
        $page = new Router("documentation");
}
echo $page->getPage();
?>