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
        empty($data->phone) || 
        empty($data->email) || 
        empty($data->message) || 
        empty($data->date) || 
        empty($data->time) || 
        empty($data->guest)
    ) response(json_encode("nodata"),400);
        
    $object = new query();

    $name = $object->FilterString($data->name);
    $phone = $object->FilterString($data->phone);
    $email = $object->FilterString($data->email);
    $message = $object->FilterString($data->message);
    $date = $object->FilterString($data->date);
    $time = $object->FilterString($data->time);
    $guest = $object->FilterString($data->guest);
    
    $arr = array(
        "name" => $name, 
        "email" => $email, 
        "phone" => $phone, 
        "date" => $date, 
        "time" => $time, 
        "guest" => $guest,
        "description" => $message, 
    );
    $result = $object->InsertData("reservation",$arr);

    response(json_encode($result),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>