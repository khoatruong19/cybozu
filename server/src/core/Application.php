<?php

namespace core;
use shared\exceptions\ResponseException;

class Application
{
    public function __construct(
        public Response $response,
        public Request $request,
        public Router $router,
        public Database $database)
    {

    }

    public function run(): void
    {
        try {
            echo $this->router->resolve($this->request, $this->response);
        } catch (ResponseException $ex) {
            echo $this->response->response($ex->getHttpStatus(), $ex->getMessage());
        }
    }
}