/**
 * Created by suraj on 27/09/15.
 */

(function (module) {
    'use strict';
    var MongoClient = require('mongodb').MongoClient;

    module.exports = {
        saveCRN: function (data, callback) {
            data.timestamp = (new Date()).getTime();
            MongoClient.connect("mongodb://localhost:27017/ola", function (err, db) {
                if (err) {
                    log.error(err);
                    return callback(err);
                }

                var collection = db.collection('active_bookings');

                data._id = data.crn;
                delete data.crn;

                collection.insertOne(data, function (error, response) {
                    if (error) {
                        return callback(error);
                    }

                    callback(null, response);
                });

            });
        }
    }
})(module);