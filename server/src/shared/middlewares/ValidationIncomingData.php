<?php

namespace shared\middlewares;

use core\HttpStatus;
use shared\exceptions\ResponseException;

class ValidationIncomingData implements IMiddleware {

    private array $filters;
    private array $dataNeedValidate;
    private array $messages;
    public function __construct($dataNeedValidate, $filters, $messages)
    {
        $this->filters = $filters;
        $this->dataNeedValidate = $dataNeedValidate;
        $this->messages = $messages;
    }

    /**
     * @throws ResponseException
     */
    public function execute(): bool
    {
        foreach ($this->filters as $key => $value) {
            if(!array_key_exists($key, $this->dataNeedValidate)) {
                throw new ResponseException(HttpStatus::$BAD_REQUEST, $key." is required");
            }
        }

        $filteredArray  = filter_var_array($this->dataNeedValidate, $this->filters, false);

        $errors = [];
        foreach ($filteredArray as $key => $value) {
            if ($value === false) {
                $errors[] = $this->messages[$key];
            }
        }

        if(count($errors) !== 0) {
            throw new ResponseException(HttpStatus::$BAD_REQUEST, implode(",\n", $errors));
        }

        return true;
    }
}