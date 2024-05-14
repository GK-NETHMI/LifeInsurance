<?php

//For the ATTENTION of the INSPECTOR
//Please Note that we have used PHP Mailer Library in order to send the emails
//PHPMailer Library is in the utils/PHPMailer Directory
use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

function sendCustomerApprovalMail($sendEmail, $premium, $ini_pay, $p_id) {
    $subject = "Assure Life Insurance - New Customer Approval";
    $msg = "<html>
<head>
    <title>Assure Life Insurance - New Customer Approval</title>
</head>

<body>
    <h2>New Customer Approval</h2><br><br>

    <p>Dear Customer</p><br>

    <p>We are pleased to inform you that your application for a life insurance policy with Assure Life Insurance has been
        approved!</p><br>

    <p>With our comprehensive coverage and competitive rates, we are committed to ensuring your financial security and
        peace of mind. Your policy details and next steps are as follows.</p><br>
        
    <p>Monthly Premium :- $premium</p><br>
    <p>Initial Payment :- $ini_pay</p><br>
    <p>Your Policy ID :- $p_id</p><br>
    <p>Given Below is the Link for the Initial Payment.Once you complete it you can Create your Account</p><br>
    <p>http://localhost/Assure_Life_Insurance/payment.html</p><br>

    <p>Thank you for choosing Assure Life Insurance,</p>
    <p>Best regards,</p>
    <p>The Assure Life Insurance Team</p>
</body>
</html>";
    
    sendMailtoCustomer($sendEmail, $subject, $msg);
}

function sendCustomerRejectMail($sendEmail) {
    $subject = "Assure Life Insurance - New Customer Rejection";
    $msg = "<html>

<head>
    <title>Assure Life Insurance - New Customer Rejection</title>
</head>

<body>
    <h1>New Customer Rejection</h1><br><br>

    <p>Dear Customer,</p><br>

    <p>We regret to inform you that your application for a life insurance policy with Assure Life Insurance has been
        rejected.</p><br>

    <p>Based on our evaluation, we are unable to provide coverage at this time. If you have any questions or need
        further clarification, please feel free to contact our customer support team.</p><br>

    <p>We appreciate your interest in Assure Life Insurance and wish you the best in your future endeavors.</p><br>

    <p>Best regards,</p>
    <p>The Assure Life Insurance Team</p>
</body>

</html>";

    sendMailtoCustomer($sendEmail, $subject, $msg);
}

function sendClaimRejectMail($sendMail) {
    $subject = "Assure Life Insurance - Claim Rejection";
    $msg = "<html>

<head>
    <title>Assure Life Insurance - Claim Rejection</title>
</head>

<body>
    <h1>Claim Rejection</h1><br><br>

    <p>Dear Customer,</p><br>

    <p>We regret to inform you that your Claim application has been rejected.</p><br>

    <p>Based on our evaluation, we are unable to provide coverage at this time. If you have any questions or need
        further clarification, please feel free to contact our customer support team.</p><br>

    <p>We appreciate your interest in Assure Life Insurance and wish you the best in your future endeavors.</p><br>

    <p>Best regards,</p>
    <p>The Assure Life Insurance Team</p>
</body>

</html>";
    sendMailtoCustomer($sendMail, $subject, $msg);
}

function sendOTPMail($sendMail, $otp) {
    $subject = "Assure Life Insurance - Forgot Password";
    $msg = "<html>

<head>
    <title>Assure Life Insurance - Forgot Password</title>
</head>

<body>
    <h1>OTP</h1><br><br>

    <p>Dear Customer,</p><br>

    <p>Upon on your the below OTP is generated. Use it to generate new password</p><br>

    <p>$otp</p><br>

<p>Best regards,</p>
    <p>The Assure Life Insurance Team</p>
</body>

</html>";
    sendMailtoCustomer($sendMail, $subject, $msg);
}

function sendMailtoCustomer($sendMail, $subject, $body) {
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'assurelifein@gmail.com';
    $mail->Password = 'njyqqqxjfcyfqqgs';
    $mail->setFrom('assurelifein@gmail.com');
    $mail->addAddress($sendMail);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(true);
    if ($mail->send()) {
        echo true;
    } else {
        echo true;
    }
}
