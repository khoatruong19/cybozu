<?php
use DI\ContainerBuilder;
use Cloudinary\Configuration\Configuration;

require __DIR__ . '/../vendor/autoload.php';

Configuration::instance([
    'cloud' => [
      'cloud_name' => $_ENV['CLOUD_NAME'], 
      'api_key' => $_ENV['CLOUD_API_KEY'], 
      'api_secret' => $_ENV['CLOUD_API_SECRET']],
    'url' => [
      'secure' => true]]);
  
$containerBuilder = new ContainerBuilder;
$containerBuilder->addDefinitions(__DIR__ . '/config.php');
$container = $containerBuilder->build();

return $container;