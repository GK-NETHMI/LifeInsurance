<?php

session_start();
include "../utils/db.php";

// Check submission
if (isset($_POST["login"])) {
    $errors = array();

    // Check if the username and password entered
    if (!isset($_POST["uid"]) || strlen(trim($_POST["uid"])) < 1) {
        $errors[] = "Username is missing/invalid";
    }
    if (!isset($_POST["pwd"]) || strlen(trim($_POST["pwd"])) < 1) {
        $errors[] = "Password is missing/invalid";
    }


    if (empty($errors)) {

        $userName = mysqli_real_escape_string($conn, $_POST["uid"]);
        $password = mysqli_real_escape_string($conn, $_POST["pwd"]);

        // Prepare database query
        $query = "SELECT * FROM user WHERE username = '$userName' AND password = '$password'";
        $result_set = mysqli_query($conn, $query);

        // Check if the query was successful
        if (mysqli_num_rows($result_set) == 1) {
            // Valid user found
            $user_data = mysqli_fetch_assoc($result_set);
            $_SESSION['user_id'] = $user_data['user_id'];

            if ($user_data['user_type_id'] == "1" || $user_data["user_type_id"] == "2") {
                $_SESSION['u_type'] = $user_data['user_type_id'];
                header("location: ../employeeProfile.html");
            } else {
                $_SESSION['u_type'] = $user_data['user_type_id'];
                header("location: ../customerProfile.html");
            }
        } else {
            // Username and password incorrect
            $errors[] = "Invalid username or password";
        }
    }
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
}



