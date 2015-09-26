/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';
    var vcommon = require('./vcommon/route');
    module.exports = {
        init: function (app) {
            vcommon.init(app);
        }
    };
})(module);