<?php

session_start();
include '../../utils/db.php';

if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {

    //user is a customer
    if ($_SESSION['u_type'] == 3) {

        $sql = "select * from policy_holder where user_id = '" . $_SESSION['user_id'] . "'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $pid = $row['policy_holder_id'];
        $_SESSION['pid'] = $pid;
        $_SESSION['pName'] = $row['initials_name'];
        $_SESSION['pImg'] = $row['img'];
        $row["u_type"] = $_SESSION['u_type'];
        $row["eid"] = loadEnquiryID($conn);
        $row["prid"] = loadPremiumID($conn);
        $row["cid"] = loadClaimID($conn);
        $row["actPol"] = loadActivePolicies($conn, $pid);
        $row["fbid"] = loadFeedbackID($conn);

        echo json_encode($row);

        //user is a beneficiary
    } else {

        $sql = "select * from beneficiary where user_id = '" . $_SESSION['user_id'] . "'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        $_SESSION['pid'] = $row['beneficiary_id'];
        $_SESSION['pName'] = $row['initials_name_beneficiary'];
        $_SESSION['pImg'] = $row['img'];
        $row["u_type"] = $_SESSION['u_type'];
        $row["cid"] = loadClaimID($conn);
        $row["eid"] = loadEnquiryID($conn);
        $row["fbid"] = loadFeedbackID($conn);
        
        $sql1 = "select policy_name from policies a,policy p where a.policy_id = p.policy_id and a.p_id = '" . $row['p_id'] . "'";
        $result1 = mysqli_query($conn, $sql1);
        $row1 = mysqli_fetch_assoc($result1);
        
        $row["policy_name"] = $row1['policy_name'];
        
        
        echo json_encode($row);
    }
} else {
    header("Location: ../login.html");
}

function loadEnquiryID($conn) {

    $sql = "select * from enquiry";
    $result = mysqli_query($conn, $sql);
    $enquiryId = mysqli_num_rows($result);
    return $enquiryId + 1;
}

function loadActivePolicies($conn, $pid) {

    $sql = "select * from policies a, policy p where a.policy_id = p.policy_id and a.policy_holder_id = '$pid'";
    $result = mysqli_query($conn, $sql);
    $actPol = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $actPol[$i] = mysqli_fetch_assoc($result);
        $p_id = $actPol[$i]['p_id'];
        $sql2 = "select month from premium where p_id = '$p_id' order by premium_id desc limit 1;";
        $result2 = mysqli_query($conn, $sql2);

        if (mysqli_num_rows($result2) != 0) {
            $actPol[$i]["month"] = mysqli_fetch_assoc($result2)['month'];
        } else {
            $actPol[$i]["month"] = "No Payments";
        }
    }
    return $actPol;
}

function loadPremiumID($conn) {
    $sql = "select * from premium";
    $result = mysqli_query($conn, $sql);
    $premiumId = mysqli_num_rows($result);
    return $premiumId + 1;
}

function loadClaimID($conn) {
    $sql = "select * from claim";
    $result = mysqli_query($conn, $sql);
    $claimId = mysqli_num_rows($result);
    return $claimId + 1;
}

function loadFeedbackID($conn) {

    $sql = "select * from feedback";
    $result = mysqli_query($conn, $sql);
    $feedbackId = mysqli_num_rows($result);
    return $feedbackId + 1;
}
