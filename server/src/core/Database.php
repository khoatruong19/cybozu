<?php

namespace core;

use PDO;

class Database
{
    private PDO $connection;

    /**
     * @throws \Exception
     */
    public function __construct()
    {
        $db_type = $_ENV['DB_TYPE'] ?? "";
        $host = $_ENV['DB_HOST'] ?? "";
        $db_name = $_ENV['DB_NAME'] ?? "";
        $username = $_ENV['DB_USER'] ?? "";
        $password = $_ENV['DB_PASS'] ?? "";
        $port = $_ENV['DB_PORT'] ?? "";

        if ($db_type == "" || $host == "" || $username == "" || $password == "" || $db_name == "") {
            throw new \Exception("Database cannot be connected due to wrong configuration!");
        }

        $this->connection = new PDO("$db_type:host=$host;port=$port;dbname=$db_name", $username, $password);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function runMigration($name_file) {
        $sql = file_get_contents( dirname(__DIR__)."/../shared/migrations/".$name_file);
        $this->connection->exec($sql);
    }

    public function getConnection() {
        return $this->connection;
    }
}
