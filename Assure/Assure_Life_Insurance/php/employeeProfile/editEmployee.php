<?php

session_start();
include '../../utils/db.php';

if (isset($_POST['editEmp'])) {
    $empid = $_SESSION['emp_id'];
    $ms = $_POST['ms'];
    $address = $_POST['address'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $sql = "";

    if (isset($_FILES["empImg"]["tmp_name"]) && !empty($_FILES["empImg"]["tmp_name"])) {
        $tmpFilePath = $_FILES['empImg']['tmp_name'];
        $oldFilePath = $_FILES['empImg']['name'];
        $ext = pathinfo($oldFilePath, PATHINFO_EXTENSION);

        array_map("unlink", glob("../../sysIMG/$empid" . ".*"));

        if ($tmpFilePath != "") {
            if (move_uploaded_file($tmpFilePath, sprintf('../../sysIMG/%s.%s', $empid, $ext))) {
                $imgPath = sprintf('sysIMG/%s.%s', $empid, $ext);
                $sql = "update employee set marital_status = '$ms', address = '$address', mobile = '$mobile', email = '$email', img = '$imgPath' where employee_id = '$empid'";
            } else {
                header("Location: ../utils/error.html?error=3");
            }
        }
    } else {
        $sql = "update employee set marital_status = '$ms', address = '$address', mobile = '$mobile', email = '$email' where employee_id = '$empid'";
    }

    if ($conn->query($sql) == TRUE) {
        header("Location:" . $_SERVER['HTTP_REFERER']);
    } else {
        header("Location: ../utils/error.html?error=1");
    }
} else {
    header("Location: ../utils/error.html?error=2");
}