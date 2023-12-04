<?php
declare(strict_types=1);

namespace modules\user;

use core\HttpStatus;
use modules\user\UserRepository;
use shared\enums\EnumTypeJwt;
use shared\exceptions\ResponseException;
use shared\enums\UserRole;
use modules\auth\JwtService;
use modules\cloudinary\CloudinaryService;

class UserService
{
    public function __construct(private readonly UserRepository $user_repository, private readonly JwtService $jwt_service,
     private readonly CloudinaryService $cloudinary_service)
    {
    }

    /**
     * @throws ResponseException
     */
    
     public function create(array $create_data)
     {
        $existing_email = $this->findOne("email", $create_data['email']);

        if($existing_email) {
            throw new ResponseException(HttpStatus::$BAD_REQUEST, "Email existed!");
        }

        $create_data["password"] = password_hash($create_data["password"], PASSWORD_BCRYPT);

        $id = $this->user_repository->create($create_data);

        $file = isset($_FILES['file']) ? $_FILES['file'] : null;

        if($file){
            $options = [
                'public_id' => 'profile_user_'.$id, 
            ];

            $uploadedFile = $this->cloudinary_service->uploadFile($file, $options);

            $this->user_repository->updateOne($id, ['avatar' => $uploadedFile['url']]);
        }

        return array(
            "id" => $id,
        );
     }

    /**
     * @throws ResponseException
     */
    public function findOne(string $field, string $value)
    {
        return $this->user_repository->findOne($field, $value);
    }

    /**
     * @throws ResponseException
     */
    public function findAll()
    {
        return $this->user_repository->findAll();
    }

    /**
     * @throws ResponseException
     */
    public function getUserRole(string $user_id)
    {
        return $this->user_repository->getRole($user_id);
    }

    /**
     * @throws ResponseException
     */
    public function me(int $user_id)
    {
        $user = $this->user_repository->findOne("id", strval($user_id));

        if(!$user) throw new ResponseException(HttpStatus::$UNAUTHORIZED, "Not authorized!");

        return array(
            "user" => $user,
        );
    }

    /**
     * @throws ResponseException
     */
    public function updateOne(string $user_id, array $data)
    {
        $file = isset($_FILES['file']) ? $_FILES['file'] : null;

        if($file){
            $options = [
                'public_id' => 'profile_user_'.$user_id, 
            ];

            $uploadedFile = $this->cloudinary_service->uploadFile($file, $options);

            $data['avatar'] = $uploadedFile['url'];
        }

       $is_user_updated = $this->user_repository->updateOne($user_id, $data);

       if(!$is_user_updated) throw new ResponseException(HttpStatus::$INTERNAL_SERVER_ERROR,"Update user fail!");

       $user = $this->user_repository->findOne("id", $user_id);

       return $user;
    }

    /**
     * @throws ResponseException
     */
    public function delete(string $user_id)
    {
       $is_deleted = $this->user_repository->delete($user_id);

       if(!$is_deleted) throw new ResponseException(HttpStatus::$INTERNAL_SERVER_ERROR,"Delete user fail!");
    }

    /**
    * @throws ResponseException
    */
    public function upload(string $user_id)
    {
        $options = [
            'public_id' => 'profile_user_'.$user_id, 
        ];

        $data = $this->cloudinary_service->uploadFile($_FILES['file'], $options);
        $this->user_repository->updateOne($user_id, ['avatar' => $data['url']]);
        return $data['url'];
    }
}