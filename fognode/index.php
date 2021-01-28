<?php

include_once __DIR__ . '/../database/connection.php';

$sql = "select * from data";
$query = mysqli_query($db_conx, $sql) or die("Error at query " . $sql . '-- ' . mysqli_errno($db_conx));;
$data = array();
if(mysqli_num_rows($query) > 0){ 
while($row=mysqli_fetch_assoc($query)){
    $data[] =  array(
        'name' => $row['name'],
        'temperature' =>$row['temperature'],
        'datetime' => $row['datetime'],
        'status' => $row['status'],
        );
}
}

header('Content-Type: application/json');
echo json_encode($data);
