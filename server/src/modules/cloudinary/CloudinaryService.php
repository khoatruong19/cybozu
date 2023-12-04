<?php
declare( strict_types=1 );

namespace modules\cloudinary;

use core\HttpStatus;
use shared\exceptions\ResponseException;
use Cloudinary\Api\Upload\UploadApi;

class CloudinaryService
{
    public function __construct()
    {
    }

    /**
    * @throws ResponseException
    */

    public function uploadFile($file, array $options = []){
        $max_file_size = 25000;

        $allow_types = array('jpg', 'png', 'jpeg', 'gif');

        $file_name_array = explode(".", $file["name"]);

        $ext = $file_name_array[count($file_name_array) - 1];

        if ($file["size"] > $max_file_size) throw new ResponseException(HttpStatus::$BAD_REQUEST,"File too large!"); 

        if (!in_array($ext, $allow_types)) throw new ResponseException(HttpStatus::$BAD_REQUEST,"File wrong format!");

        try {
            $data = (new UploadApi())->upload($_FILES["file"]['tmp_name'], $options);
            return $data;

        } catch (Exception $e) {
            throw new ResponseException(HttpStatus::$INTERNAL_SERVER_ERROR,"Can't upload file!");
        }
    }
  
}