<?php
    session_start();
    header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

    include_once("../php/connect.php");
    include_once("../php/mainendpoint.php");
    include_once("./middleware.php");

    checkAutorization();

    $data = json_decode(file_get_contents("php://input"));

    //VERIFYING INPUT FIELDS
    if(empty($data->oldpassword) || empty($data->newpassword)) response(json_encode("nodata"),400);
        
    $object = new query();

    $old = $object->FilterString($data->oldpassword);
    $new = $object->FilterString($data->newpassword);

    $arr = array("uid" => $_SESSION['ipvx-5494-matsuri-userid']); //RETRIVING DATA
    $result = $object->RetriveData("auth",$arr);

    $bool = $object->VerifyString($old,$result[0]['password']);

    if($bool != true) response(json_encode("Old password mismatched"),401);

    $hashedpassword = $object->HashString($new);

    $array = array('password' => $hashedpassword );
    
    $update = $object->UpdateTable('auth',$array, $_SESSION['ipvx-5494-matsuri-userid']);

    response(json_encode($update),200);

    function response($message,$code) {
        http_response_code($code);
        print_r($message);
        exit();
    }
    
?>