<?php
include "conn.php";
if(isset($_POST["username"])&&isset($_POST["password"])){
    $user=$_POST["username"];
    $pass=sha1($_POST["password"]);
    $result=$conn->query("select * from user where username='$user'");
    $arr=$result->fetch_assoc();
    $datapass=$arr['password'];
    if($pass==$datapass){
        echo true;
    }else{
        echo false;
    }
}