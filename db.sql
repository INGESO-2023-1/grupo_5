CREATE TABLE user(
    id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(32),
    email varchar(64),
    password varchar(256)
);

CREATE TABLE follow(
    followed INT NOT NULL,
    follower INT NOT NULL
);