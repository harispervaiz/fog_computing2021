<?php
$db_conx = mysqli_connect("DB_HOST", "DB_USERNAME", "DB_PASSWORD", "DB_NAME");
// Evaluate the connection
if (mysqli_connect_errno()) {
    echo mysqli_connect_error();
    exit();
}
