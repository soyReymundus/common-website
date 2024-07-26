module.exports["users"] = Object.freeze({
    OK: 1,
    NEED_ACTIONS: 2,
    DELETED: 3,
    BANNED: 4
});

module.exports["usersPermissions"] = Object.freeze({
    NONE: 1,
    MODERATOR: 2,
    ADMINISTRATOR: 3
});

module.exports["usersRelationships"] = Object.freeze({
    SEND_FRIEND_REQUEST: 1,
    CANCEL_FRIEND_REQUEST: 2,
    REJECTED_FRIEND_REQUEST: 3,
    ACCEPT_FRIEND_REQUEST: 4,
    DELETE_FRIEND: 5,
    BLOCK: 6,
    UNBLOCK: 7
});

module.exports["posts"] = Object.freeze({
    OK: 1,
    DELETED: 2,
    HIDDEN: 3
});

module.exports["chats"] = Object.freeze({
    OK: 1,
    HIDDEN: 2
});

module.exports["codes"] = Object.freeze({
    RESET: 1,
    EMAIL: 2
});

module.exports["NotificationsType"] = Object.freeze({
    FRIEND_REQUEST_ACCEPTED: 1,
    INCOMING_FRIEND_REQUEST: 2,
    POST_METION: 3,
    POST_RESPONSE: 4,
    INCOMING_MESSAGE: 5
});