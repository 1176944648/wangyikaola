<?php
include "./conn.php";
if(isset($_POST["sidarr"])){
    $sidstr=$_POST["sidarr"];
    $sidarr=explode(",", $sidstr);
    $result=Array();
    for($i=0;$i<sizeof($sidarr);$i++){
        $k=$sidarr[$i];
        $result[$i]=$conn->query("select * from wangyikaolagoods where sid=$k")->fetch_assoc();
    }
    echo json_encode($result);
}