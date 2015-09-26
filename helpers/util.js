/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';

    module.exports.appConfig = require('../configs/app.js');
    module.exports.log = require('./logger');
    module.exports.jsonView = require('../views/json');
    module.exports.codeHelper = require('./code-helper');
})(module);