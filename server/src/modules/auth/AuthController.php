<?php

namespace modules\auth;

use core\HttpStatus;
use core\Request;
use core\Response;
use core\Controller;
use shared\middlewares\ValidationIncomingData;
use modules\user\UserService;
use modules\auth\AuthService;
use http\Client\Curl\User;
use shared\exceptions\ResponseException;

class AuthController extends Controller
{
    public function __construct(
        public Request $request,
        public Response $response,
        private readonly AuthService $auth_service,
        private readonly UserService $user_service)
    {
    }

    /**
     * @throws ResponseException
     */
    public function register()
    {
        $this->requestBodyValidation([
            'email' => 'required|min:8|pattern:email',
            'full_name' => 'required|min:8',
            'password' => 'required|min:8'
        ]);

        $request_body = $this->request->getBody();

        $id = $this->auth_service->register($request_body);

        return $this->response->response(HttpStatus::$OK, "Register successfully!", $id);
    }

    /**
     * @throws ResponseException
     */
    public function login()
    {
        $this->requestBodyValidation([
            'email' => 'required|min:8|pattern:email',
            'password' => 'required'
        ]);

        $body = $this->request->getBody();
        $user_credentials = $this->auth_service->login($body);

        return $this->response->response(HttpStatus::$OK, "Login successfully!", $user_credentials);
    }

     /**
     * @throws ResponseException
     */
    public function me()
    {
        $user_id = $_SESSION["userId"];

        $user = $this->user_service->me($user_id);

        return $this->response->response(HttpStatus::$OK, "Welcome back!", $user);
    }

    public function logout()
    {
        $is_logout = $this->auth_service->logout();

        if(!$is_logout) throw new ResponseException(HttpStatus::$UNAUTHORIZED,"Not authourized 2!");

        $this->response->response(HttpStatus::$OK, "Logout successfully!", true);
    }
}