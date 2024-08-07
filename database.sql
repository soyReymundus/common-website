CREATE DATABASE CommonWeb; 

USE CommonWeb;

CREATE TABLE NotificationsType (
    ID int NOT NULL AUTO_INCREMENT,
    Message varchar(32),
    PRIMARY KEY (ID)
);

INSERT INTO NotificationsType (Message) VALUES ('Friend request accepted'); #1
INSERT INTO NotificationsType (Message) VALUES ('Incoming friend request'); #2
INSERT INTO NotificationsType (Message) VALUES ('Mention in a post'); #3
INSERT INTO NotificationsType (Message) VALUES ('Response in a post'); #4
INSERT INTO NotificationsType (Message) VALUES ('Incoming message'); #5

CREATE TABLE ChatStatus (
    ID int NOT NULL AUTO_INCREMENT,
    Message varchar(32),
    PRIMARY KEY (ID)
);

INSERT INTO ChatStatus (Message) VALUES ('Ok'); #1
INSERT INTO ChatStatus (Message) VALUES ('Hidden'); #2 #Change this

CREATE TABLE CodeTypes (
    ID int NOT NULL AUTO_INCREMENT,
    Type varchar(32),
    PRIMARY KEY (ID)
);

INSERT INTO CodeTypes (Type) VALUES ('Reset'); #1 
INSERT INTO CodeTypes (Type) VALUES ('Email'); #2

CREATE TABLE PostStatus (
    ID int NOT NULL AUTO_INCREMENT,
    Message varchar(32),
    PRIMARY KEY (ID)
);

INSERT INTO PostStatus (Message) VALUES ('Ok'); #1 
INSERT INTO PostStatus (Message) VALUES ('Deleted'); #2
INSERT INTO PostStatus (Message) VALUES ('Hidden'); #3

CREATE TABLE UserStatus (
    ID int NOT NULL AUTO_INCREMENT,
    Message varchar(32),
    PRIMARY KEY (ID)
);

INSERT INTO UserStatus (Message) VALUES ('Ok'); #1
INSERT INTO UserStatus (Message) VALUES ('Need actions'); #2
INSERT INTO UserStatus (Message) VALUES ('Deleted'); #3
INSERT INTO UserStatus (Message) VALUES ('Banned'); #4

CREATE TABLE UserPermissions (
    ID int NOT NULL AUTO_INCREMENT,
    Name varchar(32),
    PRIMARY KEY (ID)
);

INSERT INTO UserPermissions (Name) VALUES ('None'); #1
INSERT INTO UserPermissions (Name) VALUES ('Moderator'); #2
INSERT INTO UserPermissions (Name) VALUES ('Administrator'); #3

CREATE TABLE Contracts (
    ID int NOT NULL AUTO_INCREMENT,
    HashName varchar(64) NOT NULL,
    IsSpecial BOOL NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE (HashName)
);

CREATE TABLE Users (
    ID int NOT NULL AUTO_INCREMENT,
    Username varchar(32),
    DisplayName varchar(32),
    Photo varchar(64),
    Password varchar(64) NOT NULL,
    PasswordResets INT NOT NULL DEFAULT 0,
    EmailResets INT NOT NULL DEFAULT 0,
    Language varchar(8),
    Theme varchar(8),
    Banner varchar(64),
    Email varchar(320),
    Description varchar(500),
    Status int NOT NULL DEFAULT 2,
    Permissions int NOT NULL DEFAULT 1,
    ContractID int NOT NULL,
    LastName varchar(60),
    FirstName varchar(60),
    BirthDate BIGINT,
    UsernameCoolDown BIGINT DEFAULT 0,
    DeletionDate BIGINT,
    CreationDate BIGINT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (Status) REFERENCES UserStatus(ID),
    FOREIGN KEY (ContractID) REFERENCES Contracts(ID),
    FOREIGN KEY (Permissions) REFERENCES UserPermissions(ID),
    UNIQUE (Email),
    UNIQUE (Username)
);

CREATE TABLE NotificationsInbox (
    ID int NOT NULL AUTO_INCREMENT,
    UserID int NOT NULL,
    Unread int DEFAULT 0,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Notifications (
    ID int NOT NULL AUTO_INCREMENT,
    `FROM` int NOT NULL,
    `TO` int NOT NULL,
    `Type` int NOT NULL,
    CreationDate BIGINT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (`Type`) REFERENCES NotificationsType(ID),
    FOREIGN KEY (`FROM`) REFERENCES Users(ID),
    FOREIGN KEY (`TO`) REFERENCES NotificationsInbox(ID)
);

CREATE TABLE Chats (
    ID int NOT NULL AUTO_INCREMENT,
    LastMessage BIGINT NOT NULL DEFAULT 1,
    Status int NOT NULL DEFAULT 1,
    PRIMARY KEY (ID),
    FOREIGN KEY (Status) REFERENCES ChatStatus(ID)
);

CREATE TABLE ChatParticipants (
    ChatID int NOT NULL,
    UserID int NOT NULL,
    Unread int DEFAULT 0,
    Closed BOOL NOT NULL DEFAULT FALSE,
    PRIMARY KEY (ChatID, UserID),
    FOREIGN KEY (ChatID) REFERENCES Chats(ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE Messages (
    ID int NOT NULL AUTO_INCREMENT,
    ChatID int NOT NULL,
    MessageID int,
    UserID int NOT NULL,
    Content varchar(2000),
    Attachments varchar(325),
    PublicationDate BIGINT NOT NULL,
    LastUpdate BIGINT,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (ChatID) REFERENCES Chats(ID)
);

CREATE TABLE Posts (
    ID int NOT NULL AUTO_INCREMENT,
    PostID int,
    UserID int NOT NULL,
    Title varchar(32),
    Content varchar(3000),
    PublicationDate BIGINT NOT NULL,
    LastUpdate BIGINT,
    Status int NOT NULL DEFAULT 1,
    PRIMARY KEY (ID),
    FOREIGN KEY (Status) REFERENCES PostStatus(ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

CREATE TABLE UsersBlocks (
    ID int NOT NULL AUTO_INCREMENT,
    `FROM` int NOT NULL,
    `TO` int NOT NULL,
    FOREIGN KEY (`FROM`) REFERENCES Users(ID),
    FOREIGN KEY (`TO`) REFERENCES Users(ID),
    PRIMARY KEY (ID)
);

CREATE TABLE UsersFriends (
    ID int NOT NULL AUTO_INCREMENT,
    User int NOT NULL,
    User2 int NOT NULL,
    FOREIGN KEY (User) REFERENCES Users(ID),
    FOREIGN KEY (User2) REFERENCES Users(ID),
    PRIMARY KEY (ID)
);

CREATE TABLE UsersFriendRequests (
    ID int NOT NULL AUTO_INCREMENT,
    `FROM` int NOT NULL,
    `TO` int NOT NULL,
    FOREIGN KEY (`FROM`) REFERENCES Users(ID),
    FOREIGN KEY (`TO`) REFERENCES Users(ID),
    PRIMARY KEY (ID)
);

CREATE TABLE UsersPunishments (
    ID int NOT NULL AUTO_INCREMENT,
    LegalPunishment BOOL NOT NULL,
    UserID int NOT NULL,
    Ended BOOL NOT NULL,
    Reason varchar(350),
    Duration BIGINT,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    PRIMARY KEY (ID)
);

CREATE TABLE PostsOpinions (
    ID int NOT NULL AUTO_INCREMENT,
    PostID int NOT NULL,
    UserID int NOT NULL,
    IsLike BOOL NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (PostID) REFERENCES Posts(ID),
    PRIMARY KEY (ID)
);

CREATE TABLE PostsPunishments (
    ID int NOT NULL AUTO_INCREMENT,
    LegalPunishment BOOL NOT NULL,
    Removed BOOL NOT NULL,
    PostID int NOT NULL,
    Reason varchar(350),
    FOREIGN KEY (PostID) REFERENCES Posts(ID),
    PRIMARY KEY (ID)
);

CREATE TABLE ChatsPunishments (
    ID int NOT NULL AUTO_INCREMENT,
    LegalPunishment BOOL NOT NULL,
    Removed BOOL NOT NULL,
    ChatID int NOT NULL,
    Reason varchar(350),
    FOREIGN KEY (ChatID) REFERENCES Chats(ID),
    PRIMARY KEY (ID)
);