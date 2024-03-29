//  참조 링크
//  https://github.com/a-mean-blogger/login-api/blob/459a532d67226667ca82cfce9cdc213c33ac5123/util.js

var jwt = require('jsonwebtoken');

var util = {};

util.secret = "느엉"

util.successTrue = function (data) {
    return {
        success: true,
        message: null,
        errors: null,
        data: data
    };
};

util.successFalse = function (err, message) {
    if (!err && !message) message = 'data not found';
    return {
        success: false,
        message: message,
        errors: (err) ? util.parseError(err) : null,
        data: null
    };
};

util.parseError = function (errors) {
    var parsed = {};
    if (errors.name == 'ValidationError') {
        for (var name in errors.errors) {
            var validationError = errors.errors[name];
            parsed[name] = { message: validationError.message };
        }
    } else if (errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
        parsed.username = { message: 'This username already exists!' };
    } else {
        parsed.unhandled = errors;
    }
    return parsed;
};

util.verifyJWT = function (token) {

    var success = false;
    var result = '';

    try {
        decode = jwt.verify(token, util.secret);
        
        success = true;
        result = decode;
    } catch (err) {
        result = err;
    }

    return {
        success: success,
        result: result
    };
};

module.exports = util;