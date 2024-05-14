<?php

session_start();
include '../../utils/db.php';

$pid = $_SESSION['pid'];
$eid = $_POST['enquiry-id'];
$enquiry = $_POST['enquiry-text'];

$sql = "insert into enquiry(enquiry_id,policy_holder_id,enquiry,status) values('$eid','$pid','$enquiry','0')";

if ($conn->query($sql) == TRUE) {
    header("Location:" . $_SERVER['HTTP_REFERER']);
} else {
    header("Location: ../utils/error.html?error=1");
}

mysqli_close($conn);
