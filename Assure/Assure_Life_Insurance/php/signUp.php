<?php

include '../utils/db.php';

if (isset($_POST['signUp'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = mysqli_real_escape_string($conn, $_POST['password']);
    $re_pass = mysqli_real_escape_string($conn, $_POST['re_pw']);

    if (empty($email) || empty($pass) || empty($username) || empty($re_pass)) {
        echo '<script>alert("Please input all fields!")</script>';
        echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
        exit;
    } else {
        $sql0 = "select * from user";
        $result0 = mysqli_query($conn, $sql0);
        $rows0 = mysqli_num_rows($result0);
        $userID = $rows0 + 1;

        if ($pass == $re_pass) {
            $sql_u = "SELECT * FROM user WHERE username='$username'";
            $sql_e = "SELECT * FROM policy_holder WHERE email='$email'";

            $res_u = mysqli_query($conn, $sql_u);
            $res_e = mysqli_query($conn, $sql_e);
            if (mysqli_num_rows($res_u) > 0) {
                echo '<script>alert("Username already registered!")</script>';
                echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
                exit;
            } else if (mysqli_num_rows($res_e) == 0) {
                echo '<script>alert("Email not found!")</script>';
                echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
                exit;
            } else {
                $sql1 = "INSERT INTO user VALUES('$userID','$username', '$pass','3')";
                if (mysqli_query($conn, $sql1)) {
                    $adduser_id = "UPDATE policy_holder SET user_id = '$userID' WHERE email='$email'";
                    $conn->query($adduser_id);

                    header("Location: ../login.html");
                    exit;
                }else{
                    header("Location: utils/error.html?error=1");
                }
            }
        } else {
            echo '<script>alert("Password does not match!")</script>';
            echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
        }
    }
}
?>
