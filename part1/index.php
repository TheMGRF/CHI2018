<?php
include_once "config/config.php";

//$target = isset($_GET["page"]) ? $_GET["page"] : "documentation";
//$recordset = new JSONRecordSet(DATABASE);

$page = new Router();
echo $page->getPage();
?>