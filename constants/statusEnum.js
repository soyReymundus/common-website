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