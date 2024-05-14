<?php

$newsList = scandir('../newsfeed');

foreach ($newsList as $news) {
    if (!is_dir("../newsfeed/$news")) {
        $responseNews[] = $news;
    }
}
echo json_encode($responseNews);