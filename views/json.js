/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';

    var json = function () {
        this._json = {
            error_code: 0
        };
    };

    json.prototype.setErrorCode = function (errorCode) {
        this._json.error_code = errorCode;
    };

    json.prototype.data = function (data) {
        this._json.data = data;
    };

    json.prototype.setMsg = function (msg) {
        this._json.msg = msg;
    };

    json.prototype.render = function () {

        try {
            return JSON.stringify(this._json);
        }
        catch (error) {
            return JSON.stringify({error_code: 1001, msg: 'Something went wrong. Please try again later.'});
        }
    };

    module.exports = json;
})(module);