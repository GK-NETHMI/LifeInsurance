<?php

session_start();
include '../../utils/db.php';

header("Cotent-Type: application/json");
$inputs = json_decode(stripslashes(file_get_contents("php://input")));

$fid = $inputs->fid;

$sql = "update feedback set status = '1' where feedback_id = '$fid'";

if ($conn->query($sql) == TRUE) {
    
} else {
    header("Location: ../utils/error.html?error=1");
}
mysqli_close($conn);
