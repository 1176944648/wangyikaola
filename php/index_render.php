<?php
include "conn.php";
$arr=Array();
$arr1=Array();
$arr2=Array();
$arr3=Array();
$arr4=Array();
$arr5=Array();
$arr6=Array();
$arr7=Array();
$arr8=Array();
$result1=$conn->query("select * from wangyikaolagoods where type='口碑爆款'");
for($i=0;$i<$result1->num_rows;$i++){
    $arr1[$i]=$result1->fetch_assoc();
}
$result2=$conn->query("select * from wangyikaolagoods where type='99元任选2件'");
for($i=0;$i<$result2->num_rows;$i++){
    $arr2[$i]=$result2->fetch_assoc();
}
$result3=$conn->query("select * from wangyikaolagoods where type='大牌满减'");
for($i=0;$i<$result3->num_rows;$i++){
    $arr3[$i]=$result3->fetch_assoc();
}
$result4=$conn->query("select * from wangyikaolagoods where type='美容彩妆'");
for($i=0;$i<$result4->num_rows;$i++){
    $arr4[$i]=$result4->fetch_assoc();
}
$result5=$conn->query("select * from wangyikaolagoods where type='家居个护'");
for($i=0;$i<$result5->num_rows;$i++){
    $arr5[$i]=$result5->fetch_assoc();
}
$result6=$conn->query("select * from wangyikaolagoods where type='母婴儿童'");
for($i=0;$i<$result6->num_rows;$i++){
    $arr6[$i]=$result6->fetch_assoc();
}
$result7=$conn->query("select * from wangyikaolagoods where type='美食保健'");
for($i=0;$i<$result7->num_rows;$i++){
    $arr7[$i]=$result7->fetch_assoc();
}
$result8=$conn->query("select * from wangyikaolagoods where type='工厂店精选'");
for($i=0;$i<$result8->num_rows;$i++){
    $arr8[$i]=$result8->fetch_assoc();
}
$arr[0]=$arr1;
$arr[1]=$arr2;
$arr[2]=$arr3;
$arr[3]=$arr4;
$arr[4]=$arr5;
$arr[5]=$arr6;
$arr[6]=$arr7;
$arr[7]=$arr5;
echo json_encode($arr);