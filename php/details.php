<?php
include "./conn.php";
if(isset($_GET["sid"])){
    $id=$_GET["sid"];
    $result=$conn->query("select * from wangyikaolagoods where sid='$id'");
    echo json_encode($result->fetch_assoc());
}