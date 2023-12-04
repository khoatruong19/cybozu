<?php
 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
 header('Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE, OPTIONS');
 header('Content-Type: application/json');
 
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     header('HTTP/1.1 200 OK');
     exit();
 }

require_once __DIR__ . '/../vendor/autoload.php';

use core\Application;
use core\Validation;
use modules\user\UserController;
use modules\auth\AuthController;
use shared\enums\RequestMethod;
use shared\middlewares\JwtVerify;
use shared\middlewares\AdminGuard;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

session_start();

$container = require __DIR__.'/../app/bootstrap.php';
$app = $container->get(Application::class);

$app->router->addRoute(RequestMethod::POST, "/auth/login", null, [AuthController::class, 'login']);
$app->router->addRoute(RequestMethod::POST, "/auth/register", null, [AuthController::class, 'register']);
$app->router->addRoute(RequestMethod::GET, "/auth/me", [JwtVerify::class], [AuthController::class, 'me']);
$app->router->addRoute(RequestMethod::GET, "/auth/logout", [JwtVerify::class], [AuthController::class, 'logout']);

$app->router->addRoute(RequestMethod::POST, "/users", [JwtVerify::class, AdminGuard::class], [UserController::class, 'create']);
$app->router->addRoute(RequestMethod::GET, "/users", [JwtVerify::class, AdminGuard::class], [UserController::class, 'findAll']);
$app->router->addRoute(RequestMethod::PATCH, "/users/profile/:userId", [JwtVerify::class], [UserController::class, 'updateProfile']);
$app->router->addRoute(RequestMethod::POST, "/users/:userId", [JwtVerify::class, AdminGuard::class], [UserController::class, 'update']);
$app->router->addRoute(RequestMethod::DELETE, "/users/:userId", [JwtVerify::class, AdminGuard::class], [UserController::class, 'delete']);
$app->router->addRoute(RequestMethod::POST, "/users/:userId/upload", [JwtVerify::class], [UserController::class, 'upload']);

$app->run();