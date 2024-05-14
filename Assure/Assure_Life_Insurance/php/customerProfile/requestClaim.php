<?php

session_start();
include '../../utils/db.php';

$cid = $_POST['claim-id'];
$p_id = $_POST['act-policy-name'];
$cause = $_POST['cause'];
$date = $_POST['date'];
$place = $_POST['place'];
$hospital = $_POST['hospital'];
$ward = $_POST['ward'];
$comment = $_POST['comment'];
$request_date = date('Y-m-d');

//Claim Insert
$sql = "insert into claim(claim_id,p_id,cause,date,place,hospital,ward_no,comment,request_date,status) values('$cid','$p_id','$cause','$date','$place','$hospital','$ward','$comment','$request_date','0')";

if ($conn->query($sql) == TRUE) {

//Check Proof Images available?
    if (isset($_FILES["proof"]["tmp_name"]) && !empty($_FILES["proof"]["tmp_name"])) {
        $files = array_filter($_FILES['proof']['name']);
        for ($i = 0; $i < count($_FILES['proof']['name']); $i++) {

            $tmpFilePath = $_FILES['proof']['tmp_name'][$i];
            $oldFilePath = $_FILES['proof']['name'][$i];
            $newName = "claim$cid" . "p$i";
            $ext = pathinfo($oldFilePath, PATHINFO_EXTENSION);

            if ($tmpFilePath != "") {
                if (move_uploaded_file($tmpFilePath, sprintf('../../sysIMG/%s.%s', $newName, $ext))) {
                    //Proof available
                    $imgPath = sprintf('sysIMG/%s.%s', $newName, $ext);
                    $sql2 = "insert into proof(proof,claim_id) values('$imgPath','$cid')";

                    if ($conn->query($sql2) == TRUE) {
                        header("Location:" . $_SERVER['HTTP_REFERER']);
                    } else {
                        header("Location: ../utils/error.html?error=1");
                    }
                } else {
                    header("Location: ../utils/error.html?error=3");
                }
            }
        }
    } else {
        header("Location:" . $_SERVER['HTTP_REFERER']);
    }
} else {
    header("Location: ../utils/error.html?error=1");
}
mysqli_close($conn);
