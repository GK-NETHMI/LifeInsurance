<?php

include '../utils/db.php';

if (isset($_POST['slipSubmit'])) {
    $fileName = $_FILES['file']['name'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileType = $_FILES['file']['type'];

    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower($fileExt['1']);
    $allowed = array('pdf', 'tiff');

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 50000000) {

                $sql = "select * from initial_payment";
                $result = mysqli_query($conn, $sql);
                $new_initial_payment_id = mysqli_num_rows($result);
                $new_initial_payment_id++;

                // Generate the new file name
                $fileNewName = 'iniPay' . $new_initial_payment_id;

                // Check if new_initial_payment_id equals the extracted value from $fileNewName
                if ($new_initial_payment_id === intval(substr($fileNewName, -1))) {
                    $fileDest = '../sysIMG/' . $fileNewName . ".pdf";
                    move_uploaded_file($fileTmpName, $fileDest);

                    // Get the current date
                    $date = date('Y-m-d');

                    // Get the payment method
                    $paymentMethod = "Deposit";

                    $pid2 = $_POST['pid2'];
                    $uamount2 = $_POST['amount2'];

                    $sql = "INSERT INTO initial_payment (initial_payment_id, bank_slip, payment_method,amount, date, p_id) 
                            VALUES ('$new_initial_payment_id', '$fileDest', '$paymentMethod','$uamount2', '$date', '$pid2')";
                    $result = $conn->query($sql);
                    if ($result) {
                        header('Location: ../signup.html');
                    } else {
                        header("Location: utils/error.html?error=1");
                    }
                } else {
                    echo '<script>alert("The file name does not match the initial_payment_id!")</script>';
                    echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
                }
            } else {
                echo '<script>alert("File size is too large!")</script>';
                echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
            }
        } else {
            header("Location: utils/error.html?error=3");
        }
    } else {
        echo '<script>alert("Please upload .pdf or .tiff file types only!")</script>';
        echo '<script>window.location.href = "' . $_SERVER['HTTP_REFERER'] . '";</script>';
    }
} else if (isset($_POST['proceed'])) {

    $sql = "select * from initial_payment";
    $result = mysqli_query($conn, $sql);
    $new_initial_payment_id = mysqli_num_rows($result);
    $new_initial_payment_id++;

    // Get the current date
    $date = date('Y-m-d');

    // Get the payment method
    $paymentMethod = "Online";

    $pid1 = $_POST['pid1'];
    $uamount1 = $_POST['amount1'];

    $sql = "INSERT INTO initial_payment (initial_payment_id, payment_method, amount , date, p_id)
                            VALUES ('$new_initial_payment_id', '$paymentMethod','$uamount1', '$date', '$pid1')";

    $result = $conn->query($sql);

    if ($result) {
        header('Location: ../signup.html');
    } else {
        header("Location: utils/error.html?error=1");
    }
}
?>
