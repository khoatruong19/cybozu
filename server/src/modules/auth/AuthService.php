<?php
declare( strict_types=1 );

namespace modules\auth;


use core\HttpStatus;
use modules\user\UserService;
use shared\enums\EnumTypeJwt;
use shared\exceptions\ResponseException;
use modules\auth\JwtService;

class AuthService
{
    public function __construct(private readonly UserService $user_service, private readonly JwtService $jwt_service)
    {
    }

    public function register(array $register_data)
    {
        $existing_email = $this->user_service->findOne("email", $register_data['email']);

        if($existing_email) {
            throw new ResponseException(HttpStatus::$BAD_REQUEST, "Email existed!");
        }

        $id = $this->user_service->create($register_data);

        return array(
            "id" => $id,
        );
    }

    /**
     * @param 
     * @throws ResponseException
     */
    public function login(array $login_data)
    {
        $existing_user = $this->user_service->findOne("email", $login_data["email"]);

        if (!$existing_user) {
            throw new ResponseException(HttpStatus::$BAD_REQUEST, "Invalid credential!");
        }

        $is_password_matched = password_verify($login_data["password"], $existing_user["password"]);

        if (!$is_password_matched) {
            throw new ResponseException(HttpStatus::$BAD_REQUEST, "Invalid credential!");
        }

        $access_token = $this->jwt_service->generateToken($existing_user["id"], $existing_user["role"], EnumTypeJwt::ACCESS_TOKEN);

        unset($existing_user['password']);

        return array(
            "user" => $existing_user,
            "accessToken" => $access_token,
        );
    }

    /**
     * @param 
     * @throws ResponseException
     */
    public function logout()
    {
        $user_id = $_SESSION['userId'];
        if(!$user_id) return false;

        $_SESSION['userId'] = null;
        return true;
    }
}