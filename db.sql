CREATE TABLE user(
    id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user varchar(32),
    email varchar(64),
    password varchar(256)
);