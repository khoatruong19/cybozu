use test_php;

CREATE TABLE IF NOT EXISTS users
(
    `id`             INT          NOT NULL AUTO_INCREMENT,
    `username`       VARCHAR(255) NOT NULL,
    `password`       VARCHAR(255) NOT NULL,
    `email`          NVARCHAR(255) NULL,
    `access_token`   NVARCHAR(255) NULL,
    `refresh_token` NVARCHAR(255) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE
);