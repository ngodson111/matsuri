<?php

    header("Content-Type:application/multipart-formdata");

    if(!empty($_POST['path'])) {
        unlink($_POST['path']);

        echo json_encode(true);
    }else {
        echo json_encode(false);
    }
?>