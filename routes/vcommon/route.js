/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';
    var appUtil = require('./../../helpers/util');
    var log = appUtil.log;
    var SOS = require('../../models/sos');
    var RideStatus = require('../../models/ride-status');

    module.exports = {
        init: function (app) {
            app.get('/sos', function (req, res) {
                var query = req.query;
                var json = new (appUtil.jsonView)();
                if (!(query && query.lat && query.lng)) {
                    json.setMsg('Invalid Input');
                    json.setErrorCode(1001);
                    res.status(400);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(json.render());
                    return;
                }

                var lat = query.lat,
                    lng = query.lng;
                SOS.init(lat, lng, req.user_details, function (error, data) {
                    if (error) {
                        log.error(error);
                        json.setMsg('Something went wrong.');
                        json.setErrorCode(1001);
                        res.status(500);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(json.render());
                        return;
                    }

                    json.data(data);
                    res.status(200);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(json.render());
                })
            });

            app.get('/ride/:urn/:state', function (req, res) {
                var params = req.params;
                var json = new (appUtil.jsonView)();
                if (!(params.crn && params.state)) {
                    json.setMsg('Invalid Input');
                    json.setErrorCode(1001);
                    res.status(400);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(json.render());
                    return;
                }


            });
        }
    };
})(module);