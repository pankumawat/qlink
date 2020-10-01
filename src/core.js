const token_master = require('./utils/token-master');

function getResponse(obj, success, error) {
    const respObj = {
        success: true,
        data: {},
        error
    };

    if (success !== undefined && success === false)
        respObj.success = false;
    if (error)
        respObj.error = error;
    if (obj)
        respObj.data = obj;

    return respObj;
}
exports.getSuccessResponse = function (obj) {
    return getResponse(obj, true);
}

exports.getErrorResponse = function (error, obj) {
    return getResponse(obj, false, error);
}

// Auth
exports.verifyToken = function (req, res, next) {
    token_master.verifyJwtToken(req, res).then(user => {
        req.user = user;
        next();
    });
}

exports.getJwtToken = function (user, expiry) {
    return token_master.getJwtToken(user, expiry);
}