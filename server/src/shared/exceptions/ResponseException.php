<?php

namespace shared\exceptions;

use core\HttpStatus;
use Throwable;

class ResponseException extends \Exception implements Throwable
{
    private int $http_status;
    public function __construct(int $http_status, string $message)
    {
        $this->http_status = $http_status;
        $this->message = $message;
    }

    public function getHttpStatus(): int
    {
        return $this->http_status;
    }
}