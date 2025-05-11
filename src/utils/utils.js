module.exports.isObject = (obj) => {
    return (
        typeof obj === "object" &&
        obj != null &&
        !Array.isArray(obj)
    );
}

module.exports.sleep = (milliseconds) => {
    return new Promise(r => setTimeout(r, milliseconds));
}