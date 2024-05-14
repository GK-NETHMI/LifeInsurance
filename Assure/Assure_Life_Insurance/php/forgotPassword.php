<?php

session_start();

include("../utils/db.php");
include("../utils/sendMail.php");

if (isset($_POST['otp-sub'])) {
    $email = $_POST['emailLabel'];
    $sql = "select * from policy_holder where email = '$email'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) == 1) {
        $otp = random_int(1111, 9999);
        $_SESSION["uid"] = mysqli_fetch_assoc($result)['user_id'];
        $_SESSION["OTP"] = $otp;
        sendOTPMail($email, $otp);
        echo "<script>window.location = '../forgotPassword.html';</script>";
    }
} else if (isset($_POST['oconf-sub'])) {
    $enteredOTP = $_POST['otpT1'] . "" . $_POST['otpT2'] . "" . $_POST['otpT3'] . "" . $_POST['otpT4'];
    if ($enteredOTP == $_SESSION["OTP"]) {
        echo "<script>window.location = '../forgotPassword.html?id=1';</script>";
    }
} else if (isset($_POST['pass-sub'])) {
    $newPassword = $_POST['newPLabel'];
    $newCPassword = $_POST['confirmPLabel'];
    if ($newCPassword == $newCPassword) {
        $sql = "update user set password = '$newPassword' where user_id = '" . $_SESSION['uid'] . "'";
        if ($conn->query($sql) == TRUE) {
            header("Location: ../login.html");
        }
    }
}