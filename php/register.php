<?php
include "./conn.php";
if(isset($_POST["username"])){
    $user=$_POST['username'];
    $result=$conn->query("select * from user where username='$user'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
if(isset($_POST["submit"])){
    $user=$_POST['username'];
    $pass=sha1($_POST['password']);
    $email=$_POST['email'];
    $tel=$_POST["tel"];
    $conn->query("insert user values(null,'$user','$pass','$email','$tel',NOW())");
    header('location:http://10.31.161.143/wangyikaola/dist/login.html?flag=login');
}