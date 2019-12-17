<?php
header("content-type:text/html;charset:utf-8");
define("HOST","localhost");
define("USERNAME","root");
define('PASSWORD', '');
define("DBNAME","wangyikaola");
$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if($conn->connect_error){
    die('数据库连接失败:'.$conn->connect_error);//die函数：输出括号里面的内容，并退出。
}
$conn->query("set names utf8");