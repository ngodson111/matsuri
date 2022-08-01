<?php
    session_start();
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

    include_once("../php/connect.php");
    include_once("../php/mainendpoint.php");
    include_once("./middleware.php");

    checkAutorization();

    //VERIFYING INPUT FIELDS
    if(empty($_POST['type']) || empty($_FILES['image'])) 
        response(json_encode("nodata"),400);
        
    $object = new query();

    $type = $object->FilterString($_POST['type']);

    $file = $_FILES['image'];
    $filename = $_FILES['image']['name'];
    $filetempname = $_FILES['image']['tmp_name'];
    $filenewname = "galleryImage" . uniqid(true). "." .explode(".",$filename)[1];
    $filedestination = "../public/gallery/". $filenewname;

    $fileUploadResult = $object->uploadFile($filetempname,$filedestination);

    if($fileUploadResult != 1) response(json_encode("uploadError"),408);

    $arr = array('image' => $filenewname, "status" => $type);
    $result = $object->InsertData('gallery',$arr);

    response(json_encode($result),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>