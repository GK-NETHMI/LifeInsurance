<?php

session_start();

//check header type logined or not
if ($_GET['id'] === "1") {
    if (isset($_SESSION['pid']) && !empty($_SESSION['pid'])) {

        $pName = $_SESSION['pName'];
        $pImg = $_SESSION['pImg'];

        $parts = explode('.', $pName);
        $splitted = array_pop($parts);
        $displayName = preg_split('/[\s]+/', $splitted);
        empty($displayName[1]) ? $data = array($displayName[0], $pImg) : $data = array($displayName[1], $pImg);
        
        echo json_encode($data);
    } else if (isset($_SESSION['emp_id']) && !empty($_SESSION['emp_id'])) {

        $eName = $_SESSION['eName'];
        $eImg = $_SESSION['eImg'];
        
        $parts = explode('.', $eName);
        $splitted = array_pop($parts);
        $displayName = preg_split('/[\s]+/', $splitted);
        empty($displayName[1]) ? $data = array($displayName[0], $eImg) : $data = array($displayName[1], $eImg);
        
        echo json_encode($data);
    } else {
        echo '0';
    }
//log out
} else if ($_GET['id'] === "2") {
    session_destroy();

//redirect profile
} else if ($_GET['id'] === "3") {
    if (isset($_SESSION['pid']) && !empty($_SESSION['pid'])) {
        echo '1';
    } else if (isset($_SESSION['emp_id']) && !empty($_SESSION['emp_id'])) {
        echo '2';
    }
}
