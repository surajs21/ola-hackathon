/**
 * Created by suraj on 27/09/15.
 */

(function (module) {
    'use strict';
    var request = require('request');
    module.exports = {
        TYPE: {
            EMERGENCY   : 'emergency',
            BOOKING     : 'booking',
            RIDE_STARTED: 'ride_started',
            RIDE_END    : 'ride_end'
        },
        send: function (data, type, callback) {
            var options = {
                url    : 'https://api.parse.com/1/push',
                headers: {
                    'X-Parse-Application-Id': 'EKmU1bNiZrazHVqfyXLN7ZQYTXYhcowc4ibggpgp',
                    'X-Parse-REST-API-Key'  : '7hdYEF3JmNEzoYTwd0L2Dj7I9i8fGdScJt2GN7TX',
                    'Content-Type'          : 'application/json'
                },
                method : 'POST',
                json   : {
                    "where": {"username": "123"},
                    "data" : {
                        "action"  : type,
                        "sos_data": data
                    }
                }
            };

            request(options, function (error, response, body) {
                if (error) {
                    return callback(error);
                }

                if (response.statusCode === 200) {
                    return callback(null, body);
                }

                callback("response_status parse: " + response.statusCode);
            });
        }
    }
})(module);