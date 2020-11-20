<?php
//include_once 'classes/pages/WebPage.class.php';
//include_once 'classes/pages/FillableWebPage.class.php';
//include_once 'classes/pages/RoutedWebPage.class.php';
//include_once 'classes/Router.class.php';
include_once "config/config.php";

//$target = isset($_GET["page"]) ? $_GET["page"] : "documentation";
$recordset = new JSONRecordSet(DATABASE);

$page = new Router($recordset);
echo $page->getPage();
?>