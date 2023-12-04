<?php

namespace core;

use app\middlewares\ValidationIncomingData;
use shared\enums\RequestMethod;
use core\Validation;

class Request
{
    protected $params = array();
    protected $queries = array();

    public function __construct(public Validation $validation)
    {

    }

    private function extractQuery($path): void
    {
        $position = strpos($path, '?');
        $queries_string = substr($path, $position + 1);

        $queries_component = explode("&", $queries_string);
        foreach ($queries_component as $value) {
            $pair = explode("=", $value);
            $this->queries[$pair[0]] = $pair[1];
        }
    }

    public function getMethod(): string
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    public function getPath()
    {
        $path = $_SERVER['REQUEST_URI'] ?? '/';
        $position = strpos($path, '?');

        if ($position === false) {
            return $path;
        }

        $this->extractQuery($path);
        return substr($path, 0, $position);
    }

    public function getBody()
    {
        $body = json_decode(file_get_contents('php://input'), true);

        if(!is_array($body)){
            $body = [];
            switch (strtoupper($this->getMethod())) {
                case RequestMethod::POST->name:
                    foreach ($_POST as $key => $value) {
                        $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
                    }
                    break;
                default:
                    break;
            }
        }

        return $body;
    }

    public function validateBody(array $field_rules)
    {
        $body = $this->getBody();

        // if(count($field_rules) < count($body)){
        //     return $this->validation->redundantFieldErrors();
        // }

        foreach ($field_rules as $field => $value) {
            $rules = explode('|', $value);

            foreach($rules as $rule) { 
                $rule_array = explode(':', $rule);
                $rule_method = $rule_array[0];
                $rule_method_parameter;

                if(count($rule_array) > 1){
                    $rule_method_parameter = $rule_array[1];
                }

                $this->validation->name($field)->value(isset($body[$field]) ? $body[$field] : "");
                if(isset($rule_method_parameter)){
                    call_user_func(array($this->validation, $rule_method), $rule_method_parameter);
                }
                else{
                    call_user_func(array($this->validation, $rule_method));
                }

                if(!$this->validation->isSuccess()) break;
            }
        }
        return $this->validation->getErrors();
    }

    public function setParam($key, $value)
    {
        $this->params[$key] = $value;
    }

    public function getParam($key)
    {
        return $this->params[$key];
    }

    public function getQuery($key)
    {
        return $this->queries[$key];
    }

    public function getQueries()
    {
        return $this->queries;
    }

    public function getParams()
    {
        return $this->params;
    }
}
