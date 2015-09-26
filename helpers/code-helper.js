/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';

    var parsetrace  = require('parsetrace');
    var helper = {
        parsetrace: function (error) {
            return parsetrace(error, {sources: false}).toString();
        }
    };

    module.exports = helper;
})(module);