<?php 
    
    $servername = "rdbms.strato.de";
    $user = "dbu596396";
    $pw = "exBwJews9ZMWZVLPCrH";
    $dbname = "dbs2000829";
    
    $con = mysqli_connect($servername, $user, $pw, $dbname);

    if($con->connect_error) {
        die("SQL Connection failed!");
    }

    $result = mysqli_query($con, "SELECT * FROM moneten");
    
    $shipList = mysqli_query($con, "SELECT * FROM ships  ORDER BY ships.shipPrice  DESC");
?>