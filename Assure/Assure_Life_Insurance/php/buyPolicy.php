<?php

include '../utils/db.php';
/* <-- -----------------------------------------------Personal Details------------------------------------------------------------ --> */
if (isset($_POST['submit'])) {
    $query = "SELECT * FROM policy_holder";
    $result = mysqli_query($conn, $query);
    $resultCheck = mysqli_num_rows($result);

    $new_policy_holder_id = 'PHID' . ($resultCheck + 1);

    $uFullName = $_POST['fullName'];
    $uIniName = $_POST['iniName'];
    $uTitle = $_POST['title'];
    $uNic = $_POST['nic'];
    $uDate = $_POST['date'];
    $uGender = $_POST['gender'];
    $uMarital = $_POST['marital'];
    $uAddress = $_POST['address'];
    $uMobile = $_POST['mobile'];
    $uEmail = $_POST['email'];
    $uOccupation = $_POST['occupation'];
    $uWork = $_POST['work'];

    $sql1 = "INSERT INTO policy_holder (policy_holder_id , full_name , initials_name , title , nic , dob , gender , marital_status , address , mobile , email , occupation , work_company) 
                 VALUES ('$new_policy_holder_id','$uFullName','$uIniName','$uTitle','$uNic','$uDate','$uGender','$uMarital','$uAddress','$uMobile','$uEmail','$uOccupation','$uWork')";
    $add1 = $conn->query($sql1);
    
    /* <-- -----------------------------------------------Policies Details------------------------------------------------------------ --> */
    $uduration = $_POST['duration'];
    $upolicyID = $_POST['policyID'];
    $date = date('y/m/d');

    /* Policies table data insert  */
    $sql6 = "INSERT INTO policies (policy_holder_id , policy_id , duration , date , status )
                 VALUES ('$new_policy_holder_id','$upolicyID','$uduration','$date','0')";
    $add6 = $conn->query($sql6);
    $p_id = mysqli_insert_id($conn);

    /* <-- -----------------------------------------------Beneficiary Details------------------------------------------------------------ --> */
    $bFullName = $_POST['bfullName'];
    $bIniName = $_POST['biniName'];
    $bTitle = $_POST['btitle'];
    $bNic = $_POST['bnic'];
    $bDate = $_POST['bdate'];
    $bGender = $_POST['bgender'];
    $bMarital = $_POST['bmarital'];
    $bAddress = $_POST['baddress'];
    $bMobile = $_POST['bmobile'];
    $bEmail = $_POST['bemail'];
    $bRelation = $_POST['brelation'];

    $sql2 = "INSERT INTO beneficiary (beneficiary_name , initials_name_beneficiary , title , nic , dob , gender  , marital_status , `address` , mobile , email , relation, p_id) 
                 VALUES ('$bFullName','$bIniName','$bTitle','$bNic','$bDate','$bGender','$bMarital','$bAddress','$bMobile','$bEmail','$bRelation', '$p_id')";
    $add2 = $conn->query($sql2);

    /* <-- -----------------------------------------------Medical Details------------------------------------------------------------ --> */
    $umq1 = $_POST['mq1'];
    $umq2 = $_POST['mq2'];
    $umq3 = $_POST['mq3'];
    $umq4 = $_POST['mq4'];
    $umq5 = $_POST['mq5'];
    $umq6 = $_POST['mq6'];
    $umq7 = $_POST['mq7'];
    $umq8 = $_POST['mq8'];
    $umq9 = $_POST['mq9'];
    $umq10 = $_POST['mq10'];

    $sql3 = "INSERT INTO medical_details (policy_holder_id , q1 , q2 , q3 , q4 , q5 , q6 , q7 , q8 , q9 , q10)  
                 VALUES ('$new_policy_holder_id','$umq1','$umq2','$umq3','$umq4','$umq5','$umq6','$umq7','$umq8','$umq9','$umq10')";
    $add3 = $conn->query($sql3);

    /* <-- -----------------------------------------------Additional Details------------------------------------------------------------ --> */
    $uheight = $_POST['height'];
    $uweight = $_POST['weight'];
    $uaq1 = $_POST['aq1'];
    $uaq2 = $_POST['aq2'];
    $uaq3 = $_POST['aq3'];
    $uaq4 = $_POST['aq4'];
    $uaq5 = $_POST['aq5'];
    $uaq6 = $_POST['aq6'];

    $sql4 = "INSERT INTO additional_details (policy_holder_id , height , weight , q1 , q2 , q3 , q4 , q5 , q6)  
                 VALUES ('$new_policy_holder_id','$uheight','$uweight','$uaq1','$uaq2','$uaq3','$uaq4','$uaq5','$uaq6')";
    $add4 = $conn->query($sql4);

    /* <-- -----------------------------------------------Bank Details------------------------------------------------------------ --> */
    $ubankName = $_POST['bankName'];
    $ubranchName = $_POST['branchName'];
    $uaccountNo = $_POST['accountNo'];
    $uaccountName = $_POST['accountName'];

    $sql5 = "INSERT INTO bank_details (account_no , account_name , branch , bank , policy_holder_id)
                 VALUES ('$uaccountNo','$uaccountName','$ubranchName','$ubankName','$new_policy_holder_id')";
    $add5 = $conn->query($sql5);

    if ($add1 && $add2 && $add3 && $add4 && $add5 && $add6) {
        header('Location: ../index.html');
    } else {
        header("Location: utils/error.html?error=1");
    }
}
/* Load policy names to the form */

$sql = "select * from policy";
$result = mysqli_query($conn, $sql);
$policyName = array();
for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    $policyName[$i] = mysqli_fetch_assoc($result);
}
echo json_encode($policyName);
?>

