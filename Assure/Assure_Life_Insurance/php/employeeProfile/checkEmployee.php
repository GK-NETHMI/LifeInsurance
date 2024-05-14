<?php

session_start();
include '../../utils/db.php';

if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {

    $sql = "select * from employee where user_id = '" . $_SESSION['user_id'] . "'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $_SESSION['emp_id'] = $row['employee_id'];
    $_SESSION['eName'] = $row['initial_name'];
    $_SESSION['eImg'] = $row['img'];
    
    $row["u_type"] = $_SESSION['u_type'];
    $row["customers"] = loadCustomerData($conn);
    $row["newCustomers"] = loadNewCustomers($conn);
    $row["employees"] = loadEmployeeData($conn);
    $row["enquiries"] = loadEnquiries($conn);
    $row["newsfeed"] = loadNewsFeed();
    $row["feedbacks"] = loadFeedBack($conn);
    $row["claims"] = loadApproveClaim($conn);

    echo json_encode($row);
} else {
    header("Location: ../login.html");
}

function loadCustomerData($conn) {
    $sql = "select * from policy_holder";
    $result = mysqli_query($conn, $sql);
    $customers = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $customers[$i] = mysqli_fetch_assoc($result);
        $phID = $customers[$i]['policy_holder_id'];

        $sql2 = "select policy_name from policies a, policy p where a.policy_id = p.policy_id and policy_holder_id = '$phID'";
        $result2 = mysqli_query($conn, $sql2);
        $policies = array();
        for ($j = 0; $j < mysqli_num_rows($result2); $j++) {
            $policyArr = mysqli_fetch_assoc($result2);
            $policies[$j] = $policyArr['policy_name'];
        }
        $customers[$i]['policies'] = $policies;
    }
    return $customers;
}

function loadNewCustomers($conn) {
    $sql = "select a.*, p.policy_name from policies a, policy p where p.policy_id = a.policy_id and a.status = 0;";
    $result = mysqli_query($conn, $sql);
    $newCustomers = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {

        $newCustomers[$i] = mysqli_fetch_assoc($result);
        $phid = $newCustomers[$i]['policy_holder_id'];
        $p_id = $newCustomers[$i]['p_id'];

        $sql2 = "select * from policy_holder where policy_holder_id = '$phid';";
        $sql3 = "select * from beneficiary where p_id = '$p_id'";
        $sql4 = "select * from medical_details where policy_holder_id = '$phid'";
        $sql5 = "select * from additional_details where policy_holder_id = '$phid'";
        $sql6 = "select * from bank_details where policy_holder_id = '$phid'";

        $result2 = mysqli_query($conn, $sql2);
        $result3 = mysqli_query($conn, $sql3);
        $result4 = mysqli_query($conn, $sql4);
        $result5 = mysqli_query($conn, $sql5);
        $result6 = mysqli_query($conn, $sql6);

        $newCustomers[$i]["details"] = mysqli_fetch_assoc($result2);
        $newCustomers[$i]["beneficiary"] = mysqli_fetch_assoc($result3);
        $newCustomers[$i]["medical"] = mysqli_fetch_assoc($result4);
        $newCustomers[$i]["additional"] = mysqli_fetch_assoc($result5);
        $newCustomers[$i]["bank"] = mysqli_fetch_assoc($result6);
    }
    return $newCustomers;
}

function loadEmployeeData($conn) {
    $sql = "select * from employee e, employee_type t where e.employee_type_id = t.employee_type_id";
    $result = mysqli_query($conn, $sql);
    $employees = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $employees[$i] = mysqli_fetch_assoc($result);
    }
    return $employees;
}

function loadEnquiries($conn) {
    $sql = "select enquiry_id, enquiry, reply, status from enquiry";
    $result = mysqli_query($conn, $sql);
    $enquiries = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $enquiries[$i] = mysqli_fetch_assoc($result);
    }
    return $enquiries;
}

function loadNewsFeed() {

    $path = "../../newsfeed";
    $i = 0;
    $newsFeeds = array();
    $files = array_values(array_filter(scandir($path), function ($file) use ($path) {
                return !is_dir($path . '/' . $file);
            }));

    foreach ($files as $file) {
        $newsFeeds[$i] = $file;
        $i++;
    }
    return $newsFeeds;
}

function loadFeedBack($conn) {

    $sql = "select * from feedback";
    $result = mysqli_query($conn, $sql);
    $feedBacks = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $feedBacks[$i] = mysqli_fetch_assoc($result);
    }
    return $feedBacks;
}

function loadApproveClaim($conn) {
    $sql = "select c.*, p.policy_name, ph.policy_holder_id from claim c, policies a, policy p, policy_holder ph where c.p_id = a.p_id and a.policy_id = p.policy_id and a.policy_holder_id = ph.policy_holder_id and c.status = '0';";
    $result = mysqli_query($conn, $sql);
    $claims = array();
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        $claims[$i] = mysqli_fetch_assoc($result);
    }
    return $claims;
}
