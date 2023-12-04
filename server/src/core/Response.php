<?php

namespace core;

class Response {

    private $success_response = array();
    public function setStatusCode(int $statusCode) {
        return http_response_code($statusCode);
    }

    public function __construct()
    {
        $this->success_response = [HttpStatus::$OK, HttpStatus::$CREATED];
    }

    public function response($http_status_code, $message, $data = null) {
        header('Content-Type: application/json');
        http_response_code($http_status_code);

        $response['statusCode'] = $http_status_code;
        $response['messages'] = $message;
        if($data) $response['data'] = $data;

        echo json_encode($response);
        die;
    }
}