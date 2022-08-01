<?php
    //CONNECTING TO DATABASE
    class Database {
        private $localhost;
        private $username;
        private $password;
        private $databasename;
        protected function connect() {
            $this->localhost = 'localhost';
            $this->username = 'root';
            $this->password = '';
            $this->databasename = 'matsuri';
            
            $connection = new mysqli($this->localhost,$this->username,$this->password,$this->databasename);
    
            return $connection;
        }

    }
?>