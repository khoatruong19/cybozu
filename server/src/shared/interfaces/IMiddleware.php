<?php

namespace shared\interfaces;

interface IMiddleware {
    public function execute(): bool;
}