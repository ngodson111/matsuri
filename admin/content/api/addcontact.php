<?php
    session_start();
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

    include_once("../php/connect.php");
    include_once("../php/mainendpoint.php");
    include_once("./middleware.php");

    checkAutorization();

    $data = json_decode(file_get_contents("php://input"));

    //VERIFYING INPUT FIELDS
    if(
        empty($data->name) || 
        empty($data->email) || 
        empty($data->message) 
    ) response(json_encode("nodata"),400);
        
    $object = new query();

    $name = $object->FilterString($data->name);
    $email = $object->FilterString($data->email);
    $message = $object->FilterString($data->message);
    
    $arr = array(
        "name" => $name, 
        "email" => $email,
        "description" => $message, 
    );
    $result = $object->InsertData("contact",$arr);

    response(json_encode($result),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>