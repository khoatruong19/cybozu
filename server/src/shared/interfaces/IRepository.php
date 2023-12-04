<?php

namespace shared\interfaces;

interface IRepository {
    public function create($data);
    public function findOne(string $field, string $value);
    public function updateOne(string $field, array $data);
    public function delete(string $entity);
}