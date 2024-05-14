<?php

session_start();
include '../../utils/db.php';

header("Cotent-Type: application/json");
$response = "";
$inputs = json_decode(stripslashes(file_get_contents("php://input")));

$employee_id = $_SESSION['emp_id'];
$eid = $inputs->eid;
$reply = $inputs->rtext;

$sql = "update enquiry set reply = '$reply', employee_id = '$employee_id',status = '1' where enquiry_id = '$eid'";

if ($conn->query($sql) == TRUE) {
    
} else {
    header("Location: ../utils/error.html?error=1");
}
mysqli_close($conn);
