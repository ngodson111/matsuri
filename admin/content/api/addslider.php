<?php
    session_start();
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

    include_once("../php/connect.php");
    include_once("../php/mainendpoint.php");
    include_once("./middleware.php");

    checkAutorization();

    //VERIFYING INPUT FIELDS
    if(empty($_POST['title']) || empty($_FILES['image']) || empty($_POST['description'])) 
        response(json_encode("nodata"),400);
        
    $object = new query();

    $title = $object->FilterString($_POST['title']);
    $description = $object->FilterString($_POST['description']);

    $file = $_FILES['image'];
    $filename = $_FILES['image']['name'];
    $filetempname = $_FILES['image']['tmp_name'];
    $filenewname = "sliderImage" . uniqid(true). "." .explode(".",$filename)[1];
    $filedestination = "../public/slider/". $filenewname;

    $fileUploadResult = $object->uploadFile($filetempname,$filedestination);

    if($fileUploadResult != 1) response(json_encode("uploadError"),408);

    $arr = array('title'=>$title, "description" => $description, 'image' => $filenewname);
    $result = $object->InsertData('slider',$arr);

    response(json_encode($result),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>