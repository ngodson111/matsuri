<?php
    session_start();
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

    include_once("../php/connect.php");
    include_once("../php/mainendpoint.php");
    include_once("./middleware.php");

    checkAutorization();

    $data = json_decode(file_get_contents("php://input"));

    //VERIFYING INPUT FIELDS
    if(empty($data->array)) response(json_encode("nodata"),400);
        
    $object = new query();

    $table = $object->FilterString($data->array[0]);
    $uid = $object->FilterString($data->array[1]);

    $result = $object->DeleteData($table,$uid);

    response(json_encode($result),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>