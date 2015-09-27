/**
 * Created by suraj on 27/09/15.
 */

(function (module) {
    'use strict';
    var request = require('request');
    var OLA_APP_TOKEN = '603b0f1b871c4b8d80e9aa5b50f2cbff';
    var OLA_SANDBOX_DOMAIN = 'http://sandbox-t.olacabs.com';
    var LIST_CAB_URI = '/v1/products';
    var BOOK_CAB_URI = '/v1/bookings/create';

    module.exports = {
        list: function (lat, lng, callback) {
            request({
                url    : OLA_SANDBOX_DOMAIN + LIST_CAB_URI,
                qs     : {pickup_lat: lat, pickup_lng: lng},
                headers: {
                    'X-APP-TOKEN': OLA_APP_TOKEN
                }
            }, function (error, response, body) {
                if (error) {
                    return callback(error);
                }

                if (response.statusCode == 200) {
                    if (body) {
                        body = JSON.parse(body);
                    }

                    if (body.status === 'FAILURE') {
                        return callback(body);
                    }

                    callback(null, body.categories);
                    return;
                }

                callback("response_status ola list: " + response.statusCode);
            });
        },
        book: function (lat, lng, category, userAuth, callback) {
            var options = {
                url    : OLA_SANDBOX_DOMAIN + BOOK_CAB_URI,
                qs     : {
                    pickup_lat : Number(lat),
                    pickup_lng : Number(lng),
                    pickup_mode: 'NOW',
                    category   : category
                },
                headers: {
                    'X-APP-TOKEN'  : OLA_APP_TOKEN,
                    'Authorization': 'Bearer ' + userAuth
                }
            };

            request(options, function (error, response, body) {
                if (error) {
                    return callback(error);
                }

                console.log('body', body);
                console.log('response.statusCode', response.statusCode);

                if (response.statusCode == 200) {
                    if (body) {
                        body = JSON.parse(body);
                    }

                    if (body.status === 'FAILURE') {
                        return callback(body);
                    }

                    callback(null, body);
                    return;
                }

                callback("response_status ola book: " + response.statusCode);
            });
        }

    }
})(module);