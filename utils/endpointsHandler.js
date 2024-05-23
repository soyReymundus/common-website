const fs = require("fs");
const path = require("path");

module.exports = (router, currentDir) => {
    let paths = fs.readdirSync(currentDir);
    const jsFiles = paths.filter(p => p.endsWith(".js"));
    const notJsFiles = paths.filter(p => !p.endsWith(".js"));
    paths = notJsFiles.concat(jsFiles);

    for (let index = 0; index < paths.length; index++) {
        let dir = path.resolve(currentDir, paths[index]);
        let dirName = path.basename(dir, ".js");
        let endpointName = "/" + dirName;
        const p = fs.statSync(dir);

        if (p.isFile()) {
            if (paths[index] == "handler.js") {
                continue;
            } else if (paths[index] == "index.js") {
                router.use("/", require(dir));
            } else {
                router.use(endpointName, require(dir));
            };
        } else {
            router.use(endpointName, require(path.resolve(dir, "handler.js")));
        };
    };

    return router;
};