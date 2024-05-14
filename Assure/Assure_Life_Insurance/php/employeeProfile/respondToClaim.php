<?php

session_start();
include '../../utils/db.php';

header("Cotent-Type: application/json");
$inputs = json_decode(stripslashes(file_get_contents("php://input")));

$cid = $inputs->cid;
$phid = $inputs->phid;
$state = $inputs->state;
$amount = $inputs->amount;

if ($state === 1) {
    $sql = "update claim set status = '1', amount = '$amount' where claim_id = '$cid'";
    if ($conn->query($sql) == TRUE) {
        
    } else {
        header("Location: ../utils/error.html?error=1");
    }
} else {
    $sql1 = "select proof from proof where claim_id = '$cid'";
    $result = mysqli_query($conn, $sql1);
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $proofs = mysqli_fetch_assoc($result)['proof'];
        if (unlink("../../" . $proofs)) {
            
        }
    }

    $sql2 = "delete from proof where claim_id = '$cid'";
    $sql3 = "delete from claim where claim_id = '$cid'";
    if ($conn->query($sql2) == TRUE) {
        if ($conn->query($sql3) == TRUE) {
            
        } else {
            header("Location: ../utils/error.html?error=1");
        }
    } else {
        header("Location: ../utils/error.html?error=1");
    }
}