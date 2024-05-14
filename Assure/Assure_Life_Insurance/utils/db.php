<?php

$conn = new mysqli("localhost", "root", "1234", "assure");

if($conn->connect_error){
    die("Connection Failed : ". $conn->connect_error);
}
?>