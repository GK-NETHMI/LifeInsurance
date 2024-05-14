<?php

session_start();
include '../../utils/db.php';

$pid = $_SESSION['pid'];
$fid = $_POST['feedback-id'];
$ftxt = $_POST['feedback-text'];

$sql = "insert into feedback values('$fid','$ftxt','0','$pid')";

if ($conn->query($sql) == TRUE) {
    header("Location:" . $_SERVER['HTTP_REFERER']);
} else {
    header("Location: ../utils/error.html?error=1");
}

mysqli_close($conn);
