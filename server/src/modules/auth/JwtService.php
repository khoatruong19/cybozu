<?php

namespace modules\auth;

use core\HttpStatus;
use DateTime;
use Exception;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
use shared\enums\EnumTypeJwt;
use shared\exceptions\ResponseException;

class JwtService
{
    private array $key;

    public function __construct()
    {
        $this->key = array(
            EnumTypeJwt::ACCESS_TOKEN->name => $_ENV['JWT_ACCESS_KEY'],
            EnumTypeJwt::REFRESH_TOKEN->name => $_ENV['JWT_REFRESH_KEY'],
        );
    }

    public function generateToken(int $user_id, string $role, EnumTypeJwt $type): string
    {
        $iat = new DateTime();

        $exp = clone $iat;
        $exp->modify('+1 day');

        $payload = array(
            "userId" => $user_id,
            "role" => $role,
            "iat" => $iat->getTimestamp(),
            "exp" => $exp->getTimestamp(),
        );

        return JWT::encode($payload, $this->key[$type->name],'HS256');
    }

    /**
     * @throws ResponseException
     */
    public function verifyToken(EnumTypeJwt $type, string $token)
    {
        try{
            return JWT::decode($token, new Key($this->key[$type->name], 'HS256'));
        }catch(Exception) {
            throw new ResponseException(HttpStatus::$UNAUTHORIZED, "Unauthorized token");
        }
    }
}