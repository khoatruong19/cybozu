<?php

namespace core;

use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;
use shared\exceptions\ResponseException;
use shared\enums\RequestMethod;

class Router
{
    public Request $request;
    protected array $routes = [];

    public function __construct(private readonly ContainerInterface $container)
    {
        foreach (RequestMethod::cases() as $method) {
            $this->routes[strtolower($method->name)] = [];
        }
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function addRoute(RequestMethod $method, string $path, ?array $middlewares, $callback): void
    {
        $route = $this->formatRoute($path);

        $this->routes[strtolower($method->name)][$route["path"]]["call_back"] = $callback;

        if ($middlewares != null && is_array($middlewares)) {
            foreach ($middlewares as $middleware){
                if(class_exists($middleware)){
                    $this->routes[strtolower($method->name)][$route["path"]]["middlewares"][] = $this->container->get($middleware);
                }
                else{
                    throw new ResponseException(HttpStatus::$INTERNAL_SERVER_ERROR,"Middleware not found!");
                }
            }
        }

        if (count($route["params"]) === 0) {
            return;
        }

        $this->routes[strtolower($method->name)][$route["path"]]["param_keys"] = $route["params"];
    }

    /**
     * @throws ResponseException
     */
    public function resolve(Request $request, Response $response)
    {
        $this->request = $request;
        $path = $this->request->getPath();
        $method = $this->request->getMethod();

        $result_matched_route = $this->matchRoute($method, $path) ?? false;

        if ($result_matched_route === false) {
            throw new ResponseException(HttpStatus::$NOT_FOUND, "Not found");
        }

        $callback = $result_matched_route["call_back"];
        $middlewares = $result_matched_route["middlewares"];

        if($middlewares && count($middlewares) > 0) {
            foreach ($middlewares as $middleware) $middleware->execute();
        }

        if (is_array($callback)) {
            return $this->container->call($callback);
        }
    }

    private function matchRoute($request_method, $path_incoming)
    {
        foreach ($this->routes[$request_method] as $path => $pathValue) {
            if (preg_match($path, $path_incoming, $params_value)) {
                if (array_key_exists("param_keys", $this->routes[$request_method][$path])) {
                    $paramKeys = $this->routes[$request_method][$path]["param_keys"];
                    foreach ($paramKeys as $index => $param) {
                        $this->request->setParam($param, $params_value[$index + 1]);
                    }
                }

                return [
                    "call_back" => $this->routes[$request_method][$path]["call_back"],
                    "middlewares" => array_key_exists("middlewares", $this->routes[$request_method][$path]) ? $this->routes[$request_method][$path]["middlewares"] : null,
                ];
            }
        }
    }

    private function formatRoute($path)
    {
        $param_pattern = "~^\:(\w+)$~";
        $replace_pattern = "([\w-]+)";
        $path_component = explode("/", $path);
        $paramsKey = [];

        foreach ($path_component as $key => $value) {
            if (preg_match($param_pattern, $value, $matches)) {
                $path_component[$key] = $replace_pattern;
                array_push($paramsKey, $matches[1]);
            }
        }

        return
            [
                "path" => "~^" . implode("/", $path_component) . "$~",
                "params" => $paramsKey
            ];
    }
}