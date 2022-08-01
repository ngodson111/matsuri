<?php
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");
    session_start();

    include_once("../content/php/connect.php");
    include_once("../content/php/mainendpoint.php");

    $data = json_decode(file_get_contents("php://input"));

    //VERIFYING INPUT FIELDS
    if(empty($data->username) || empty($data->password)) response(json_encode("nodata"),400);
        
    $object = new query();

    $username = $object->FilterString($data->username);
    $password = $object->FilterString($data->password);

    $arr = array("username" => $username); //RETRIVING DATA
    $result = $object->RetriveData('auth',$arr);

    if(count($result) <= 0) response(json_encode("unauthorized"),401);

    $bool = $object->VerifyString($password,$result[0]['password']);
    if(!$bool) response(json_encode("unauthorized"),401);

    $_SESSION['ipvx-5494-matsuri-username'] = $result[0]['username'];
    $_SESSION['ipvx-5494-matsuri-userid'] = $result[0]['uid'];

    response(json_encode(true),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>