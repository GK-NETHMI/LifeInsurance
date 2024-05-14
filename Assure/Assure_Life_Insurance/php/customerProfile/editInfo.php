<?php

session_start();
include '../../utils/db.php';

$phid = $_SESSION['pid'];
$ms = mysqli_real_escape_string($conn, $_POST['ms']);
$address = mysqli_real_escape_string($conn, $_POST['address']);
$mobile = mysqli_real_escape_string($conn, $_POST['mobile']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$occupation = mysqli_real_escape_string($conn, $_POST['occupation']);
$work = mysqli_real_escape_string($conn, $_POST['work']);

if (isset($_FILES["img"]["name"]) && !empty($_FILES["img"]["tmp_name"])) {
    $tmpFilePath = $_FILES['img']['tmp_name'];
    $oldFilePath = $_FILES['img']['name'];
    $ext = pathinfo($oldFilePath, PATHINFO_EXTENSION);

    array_map("unlink", glob("../../sysIMG/$phid" . ".*"));

    if ($tmpFilePath != "") {
        if (move_uploaded_file($tmpFilePath, sprintf('../../sysIMG/%s.%s', $phid, $ext))) {
            $imgPath = sprintf('sysIMG/%s.%s', $phid, $ext);
            $sql = "update policy_holder set marital_status = '$ms', address = '$address', mobile = '$mobile', email = '$email', occupation = '$occupation', work_company = '$work', img = '$imgPath' where policy_holder_id = '$phid'";
        } else {
            header("Location: ../utils/error.html?error=3");
        }
    }
} else {
    $sql = "update policy_holder set marital_status = '$ms', address = '$address', mobile = '$mobile', email = '$email', occupation = '$occupation', work_company = '$work' where policy_holder_id = '$phid'";
}
if ($conn->query($sql) == TRUE) {
    header("Location:" . $_SERVER['HTTP_REFERER']);
} else {
    header("Location: ../utils/error.html?error=1");
}
