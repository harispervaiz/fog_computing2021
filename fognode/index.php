<?php
$data = array();


$data[] = array('name' => 'sensor1',
        'temperature' => 5 ,
        'datetime' => '2021-01-27 19:00:46',
        'status' => 1,
        );
$data[] = array('name' => 'sensor1',
        'temperature' => 6 ,
        'datetime' => '2021-01-27 19:02:46',
        'status' => 1,
        );

$data[] = array('name' => 'sensor2',
        'temperature' => 7 ,
        'datetime' => '2021-01-27 19:01:46',
        'status' => 1,
        );

$data[] = array('name' => 'sensor2',
        'temperature' => 6 ,
        'datetime' => '2021-01-27 19:05:46',
        'status' => 1,
        );


header('Content-Type: application/json');
echo json_encode($data);

/*$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1/fog_computing2021/sensors/temp1.php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);


print_r($result);
curl_close($ch);*/