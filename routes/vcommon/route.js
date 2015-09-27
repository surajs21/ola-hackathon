/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';
    var appUtil = require('./../../helpers/util');
    var log = appUtil.log;
    var sos = require('../../models/sos');

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
                sos.init(lat, lng, req.user_details, function (error, data) {
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
        }
    };
})(module);