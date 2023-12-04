<?php

namespace core;

class Controller
{
    public Request $request;
    public Response $response;
    public function __construct()
    {
        $this->request = $GLOBALS['request'];
        $this->response = $GLOBALS['response'];
    }

    public function requestBodyValidation(array $body_schema){
        $errors = $this->request->validateBody($body_schema);
        
        if(is_array($errors) && count($errors) > 0)
         return $this->response->response(HttpStatus::$BAD_REQUEST, $errors);
    }
}
