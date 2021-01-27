<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1/fog_computing2021/sensors/temp1.php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);


print_r($result);
curl_close($ch);