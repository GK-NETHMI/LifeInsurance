<?php

if (isset($_POST['addNews'])) {

    if (isset($_FILES["newsImg"]["name"])) {
        $tmpFilePath = $_FILES['newsImg']['tmp_name'];
        $oldFilePath = $_FILES['newsImg']['name'];
        $ext = pathinfo($oldFilePath, PATHINFO_EXTENSION);
        $num = count(scandir("../../newsfeed"));
        $newName = "NewsFeedImg$num";

        if ($tmpFilePath != "") {
            if (move_uploaded_file($tmpFilePath, sprintf('../../newsfeed/%s.%s', $newName, $ext))) {
                $imgPath = sprintf('sysIMG/%s.%s', $newName, $ext);
                header("Location:" . $_SERVER['HTTP_REFERER']);
            } else {
                header("Location: ../utils/error.html?error=3");
            }
        }
    }
} else {
    $data = json_decode(file_get_contents('php://input'), true)['newsfeed'];
    if (isset($data)) {
        if (unlink("../../newsfeed/" . $data)) {
            
        }
    }
}