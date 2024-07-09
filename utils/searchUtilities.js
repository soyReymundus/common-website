const { Op } = require('sequelize');

module.exports["dataTypes"] = Object.freeze({
    STRING: 0,
    NUMBER: 1
});

module.exports["parseQuery"] = (params, dataType = module.exports["dataTypes"].STRING) => {
    if (!Array.isArray(params)) params = [params];
    let data = [];

    for (let index = 0; index < params.length; index++) {
        const param = params[index];

        switch (dataType) {
            case module.exports["dataTypes"].STRING:
                data.push(param);
                break;
            case module.exports["dataTypes"].NUMBER:
                let paramNum = parseInt(param);

                if (isNaN(paramNum)) continue;

                data.push(paramNum);
                break;
            default:
                return null;
                break;
        };
    };

    if (data.length == 0) return null;

    return data;
};

module.exports["likesGenerator"] = (list, columnName) => {
    let returnable = {};
    if (list.length == 1) {
        returnable[columnName] = {
            [Op.like]: `%${list[0]}%`
        };
    } else {
        returnable[Op.and] = list.map((q) => {
            return module.exports["likesGenerator"]([q], columnName);
        });
    };

    return returnable;
};