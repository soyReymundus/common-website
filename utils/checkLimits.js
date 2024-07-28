const DBModels = require("../constants/DBModels.js");
const statusEnum = require("../constants/statusEnum.js");
const responsesEnum = require("../constants/responsesEnum.js");
const responseManager = require("../utils/responseManager.js");

module.exports = (map, key, limit) => {
    let limitData = {
        "expiresIn": null,
        "remaining": 0
    };
    let limits = map.get(key);
    let now = Date.now();

    if (!limits) {
        map.set(key, [now + limit.every]);

        limitData.remaining = limit.max - 1;

        return limitData;
    };

    limits = limits.filter(d => d >= now);

    if (limits.length >= limit.max) {
        limitData.expiresIn = Math.min(...limits);

        return limitData;
    };

    limits.push(now + limit.every);

    map.set(key, limits);

    limitData.remaining = limit.max - limits.length;

    return limitData;
};