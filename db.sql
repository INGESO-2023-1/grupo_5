CREATE TABLE user(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(32),
    email varchar(64),
    password varchar(256)
);

CREATE TABLE follow(
    followed INT NOT NULL,
    follower INT NOT NULL,
    FOREIGN KEY (followed) REFERENCES user(id),
    FOREIGN KEY (follower) REFERENCES user(id)
);

CREATE TABLE messages(
    message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(id),
    FOREIGN KEY (receiver_id) REFERENCES user(id)
);

CREATE TABLE blocks(
    blocker_id INT NOT NULL,
    blocked_id INT NOT NULL,
    FOREIGN KEY (blocker_id) REFERENCES user(id),
    FOREIGN KEY (blocked_id) REFERENCES user(id)
);