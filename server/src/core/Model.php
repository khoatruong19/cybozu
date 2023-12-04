<?php

namespace core;

abstract class Model
{
    public function __construct(protected readonly Database $database)
    {
    }
}