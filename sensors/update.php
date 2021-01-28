<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include_once __DIR__ . '/../database/connection.php';

if (isset($_POST['temperature']) && isset($_POST['datetime']) && isset($_POST['status']) && isset($_POST['name'])) {
    $temperature = $_POST['temperature'];
    $datetime = $_POST['datetime'];
    $status = $_POST['status'];
    $name = $_POST['name'];

    $sql="INSERT INTO `data`(`temperature`, `datetime`,`status`,`name`) VALUES ('$temperature','$datetime','$status','$name') ";
    $query=mysqli_query($db_conx,$sql) or die("Error at query " . $sql . '-- ' . mysqli_errno($db_conx));

    if(mysqli_affected_rows($db_conx)){

        echo "success";
        exit();

    }

}
