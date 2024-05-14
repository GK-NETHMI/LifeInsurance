<?php

session_start();
include '../../utils/db.php';
include '../../utils/sendMail.php';

header("Cotent-Type: application/json");
$inputs = json_decode(stripslashes(file_get_contents("php://input")));

$p_id = $inputs->pId;
$phid = $inputs->phid;
$state = $inputs->state;
$premium = $inputs->premium;
$ini_pay = $inputs->iniPay;
$email = $inputs->email;

if ($state === 1) {
    $sql = "update policies set status = '1', premium = '$premium' where p_id = '$p_id'";
    if ($conn->query($sql) == TRUE) {
        if (sendCustomerApprovalMail($email, $premium, $ini_pay, $p_id)) {
            
        } else {
            header("Location: ../../utils/error.html?error=4");
        }
    } else {
        header("Location: ../../utils/error.html?error=1");
    }
} else {
    $sql1 = "delete from medical_details where policy_holder_id = '$phid'";
    $sql2 = "delete from bank_details where policy_holder_id = '$phid'";
    $sql3 = "delete from family_details where policy_holder_id = '$phid'";
    $sql4 = "delete from additional_details where policy_holder_id = '$phid'";
    $sql5 = "delete from beneficiary where p_id = '$p_id'";
    $sql6 = "delete from policies where p_id = '$p_id'";
    $sql7 = "delete from policy_holder where policy_holder_id = '$phid'";

    if ($conn->query($sql1) == TRUE) {
        if ($conn->query($sql2) == TRUE) {
            if ($conn->query($sql3) == TRUE) {
                if ($conn->query($sql4) == TRUE) {
                    if ($conn->query($sql5) == TRUE) {
                        if ($conn->query($sql6) == TRUE) {
                            if ($conn->query($sql7) == TRUE) {
                                if (sendCustomerRejectMail($sendEmail)) {
                                    
                                } else {
                                    header("Location: ../../utils/error.html?error=4");
                                }
                            } else {
                                header("Location: ../../utils/error.html?error=1");
                            }
                        } else {
                            header("Location: ../../utils/error.html?error=1");
                        }
                    } else {
                        header("Location: ../../utils/error.html?error=1");
                    }
                } else {
                    header("Location: ../../utils/error.html?error=1");
                }
            } else {
                header("Location: ../../utils/error.html?error=1");
            }
        } else {
            header("Location: ../../utils/error.html?error=1");
        }
    } else {
        header("Location: ../../utils/error.html?error=1");
    }
}



mysqli_close($conn);
