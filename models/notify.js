/**
 * Created by suraj on 27/09/15.
 */

(function (module) {
    'use strict';

    module.exports = {
        send: function (mes, callback) {
            console.log(mes);
            callback();
        }
    }
})(module);