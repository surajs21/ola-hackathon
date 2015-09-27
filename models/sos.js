/**
 * Created by suraj on 26/09/15.
 */

(function (module) {
    'use strict';
    var async = require('async');
    var googleplaces = require('googleplaces');
    var GoogleUrl = require('google-url');
    var placeSearch = googleplaces('AIzaSyCJpvY55X90mMzfQP4oX2BZ_L4RwnLAcJk', 'json').placeSearch;
    var googleUrl = new GoogleUrl({key: 'AIzaSyCJpvY55X90mMzfQP4oX2BZ_L4RwnLAcJk'});
    var ola = require('./ola');
    var notify = require('./notify');
    var db = require('./db');
    var log = require('../helpers/logger');

    var _getCab = function _getCab(lat, lng, callback) {
        ola.list(lat, lng, function (error, cabs) {
            if (error) {
                return callback(error);
            }

            if (cabs.length === 0) {
                log.info('No cabs found. Polling to get one.');
                setTimeout(function () {
                    _getCab(lat, lng, callback);
                }, 5000);
                return;
            }

            log.info('all cabs list', cabs);

            var minIndex = 0;
            var minEta = Number.MAX_VALUE;

            cabs.forEach(function (cab, index) {
                if (cab.eta < minEta && cab.eta >= 0) {
                    minIndex = index;
                    minEta = cab.eta;
                }
            });

            if (minEta === Number.MAX_VALUE) {
                log.info('All cabs with eta -1 | Polling to try again.');
                setTimeout(function () {
                    _getCab(lat, lng, callback);
                }, 5000);
                return;
            }

            callback(null, cabs[minIndex]);
        });
    };

    module.exports = {
        init: function (lat, lng, userData, callback) {
            var hospital,
                rideDetails;

            async.waterfall([
                function searchHospital(callback) {
                    var parameters = {
                        location: [lat, lng],
                        types   : "hospital"
                    };

                    placeSearch(parameters, callback);
                },
                function searchHospitalResponse(response, asyncCallback) {
                    var results = response.results;
                    if (results.length == 0) {
                        log.info('ab toh sirf bhagwan hi apko bacha sakta hai.');
                        return callback(null, 'ab toh sirf bhagwan hi apko bacha sakta hai.');
                    }

                    hospital = results[0];

                    // cleanup shit
                    asyncCallback(null);
                },
                function listCab(callback) {
                    _getCab(lat, lng, callback);
                },
                function bookCab(cab, callback) {
                    log.info('Selected cab', cab);
                    ola.book(lat, lng, cab.id, userData.credentials.access_token, callback);
                },
                function getPathURL(ride, callback) {
                    log.info('ride', ride);
                    rideDetails = ride;

                    rideDetails.hospital_lat = hospital.geometry.location.lat;
                    rideDetails.hospital_lng = hospital.geometry.location.lng;
                    rideDetails.hospital = {
                        id      : hospital.id,
                        name    : hospital.name,
                        place_id: hospital.place_id,
                        vicinity: hospital.vicinity
                    };

                    var source = lat + ',' + lng;
                    var destination = hospital.geometry.location.lat + ',' + hospital.geometry.location.lng;
                    rideDetails.path_url = 'https://maps.google.com/maps?saddr=' + source + '&daddr=' + destination + '&hl=en';

                    googleUrl.shorten(rideDetails.path_url, function (error, shortUrl) {
                        if (error) {
                            return callback(null);
                        }

                        rideDetails.path_url = shortUrl;
                        callback(null);
                    });
                },
                function populateActiveBookingsCollection(callback) {
                    rideDetails.customer_id = userData._id;
                    db.saveCRN(rideDetails, callback);
                },
                function notifyEmergencyContacts(data, callback) {
                    delete rideDetails.customer_id;
                    rideDetails.user_data = userData;
                    notify.send(rideDetails, notify.TYPE.EMERGENCY, callback)
                }
            ], function initCB(error) {

                if (error) {
                    return callback(error);
                }

                callback(null, rideDetails);
            });
        }
    };

})(module);