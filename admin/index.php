<?php
    session_start();
    if(
        isset($_SESSION['ipvx-5494-matsuri-username']) &&
        isset($_SESSION['ipvx-5494-matsuri-userid'])
    ) {
        header("Location: ./content/index.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <!-- CSS -->
    <link rel="stylesheet" href="./assets/css/index.css">
    <!-- CSS -->
</head>

<body>
    <div class="wrapper">
        <div class="title">
            Login
        </div>

        <div class="login">
            <input type="text" placeholder="USERNAME">
            <input type="password" placeholder="PASSWORD">
        </div>

        <div class="buttons">
            <button>Login</button>
        </div>
    </div>
    <!-- SCRIPT -->
    <script src="./assets/js/app.js"></script>
    <!-- SCRIPT -->
</body>

</html>