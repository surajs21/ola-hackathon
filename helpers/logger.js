/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';

    var winston = require('winston');
    var appUtil = require('../helpers/util.js');
    var config = appUtil.appConfig;

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                name    : 'info-file',
                filename: config.log_path + 'info.log',
                level   : 'info'
            }),
            new (winston.transports.File)({
                name    : 'error-file',
                filename: config.log_path + 'error.log',
                level   : 'error'
            })
        ]
    });

    module.exports = {
        info : function (msg, meta) {
            logger.log('info', msg, meta);
        },
        error: function (msg, meta) {
            logger.log('error', msg, meta);
        }
    };

})(module);
