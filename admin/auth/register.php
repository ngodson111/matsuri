<?php
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

    include_once("../content/php/connect.php");
    include_once("../content/php/mainendpoint.php");

    $data = json_decode(file_get_contents("php://input"));

    //VERIFYING INPUT FIELDS
    if(empty($data->username) || empty($data->password)) response(json_encode("nodata"),400);
        
    $object = new query();

    $username = $object->FilterString($data->username);
    $password = $object->FilterString($data->password);

    $password = $object->HashString($password);

    $arr = array("username" => $username);//RETRIVING DATA
    $result = $object->RetriveData('auth',$arr);

    if(count($result) > 0) response(json_encode("exist"),409);

    $insert = array("username"=>$username, 'password'=>$password);
    $stat = $object->InsertData('auth',$insert);

    response(json_encode(true),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>