<?php

session_start();
include '../../utils/db.php';

//---------------------online payment-------------------------------------------
if (isset($_POST['online'])) {

    $prid = mysqli_real_escape_string($conn, $_POST['premium-id']);
    $month = mysqli_real_escape_string($conn, $_POST['month']);
    $p_id = mysqli_real_escape_string($conn, $_POST['act-policy-name']);
    $amount = mysqli_real_escape_string($conn, $_POST['amount']);
    $card_no = mysqli_real_escape_string($conn, $_POST['card-no']);
    $card_name = mysqli_real_escape_string($conn, $_POST['card-name']);
    $cvc = mysqli_real_escape_string($conn, $_POST['cvc']);
    $expiry = mysqli_real_escape_string($conn, $_POST['expiry']);
    $current_date = date('Y-m-d');

    if (empty($prid) || empty($month) || empty($p_id) || empty($amount) || empty($card_name) || empty($card_no) || empty($cvc) || empty($expiry)) {
        
    } else {
        $sql = "insert into premium(premium_id,p_id,payment_method,amount,month,date) values('$prid','$p_id','Online','$amount','$month','$current_date')";
        if ($conn->query($sql) == TRUE) {
            header("Location:" . $_SERVER['HTTP_REFERER']);
        } else {
            header("Location: ../utils/error.html?error=1");
        }
    }

//--------------------Bank deposit----------------------------------------------
} else if (isset($_POST['deposit'])) {
    $prid = mysqli_real_escape_string($conn, $_POST['premium-id']);
    $month = mysqli_real_escape_string($conn, $_POST['month']);
    $p_id = mysqli_real_escape_string($conn, $_POST['act-policy-name']);
    $amount = mysqli_real_escape_string($conn, $_POST['amount']);
    $current_date = date('Y-m-d');

    if (empty($prid) || empty($month) || empty($p_id) || empty($amount || !isset($_FILES['slip']['name']))) {
        
    } else {
        $tmpFilePath = $_FILES['slip']['tmp_name'];
        $oldFilePath = $_FILES['slip']['name'];
        $newName = "PRM$prid";
        $ext = pathinfo($oldFilePath, PATHINFO_EXTENSION);

        if ($tmpFilePath != "") {
            if (move_uploaded_file($tmpFilePath, sprintf('../../sysIMG/%s.%s', $newName, $ext))) {
                //Proof available
                $imgPath = sprintf('sysIMG/%s.%s', $newName, $ext);
                $sql = "insert into premium(premium_id,p_id,payment_method,bank_slip,amount,month,date) values('$prid','$p_id','Deposit','$imgPath','$amount','$month','$current_date')";
                if ($conn->query($sql) == TRUE) {
                    header("Location:" . $_SERVER['HTTP_REFERER']);
                } else {
                    header("Location: ../utils/error.html?error=1");
                }
            } else {
                header("Location: ../utils/error.html?error=3");
            }
        }
    }



//--------------Load Amount when policy seleted---------------------------------
} else if (isset($_GET['policy_id'])) {
    $policy_id = $_GET['policy_id'];
    $sql = "select premium from policies where p_id = '$policy_id'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
} else {
    
}

