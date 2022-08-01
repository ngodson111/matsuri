<?php
    function checkAutorization() {
        if(
            !isset($_SESSION['ipvx-5494-matsuri-username']) ||
            !isset($_SESSION['ipvx-5494-matsuri-userid'])
        ) response(json_encode("unauthorized"),401);
    }
?>