/**
 * Created by suraj on 23/05/15.
 */

(function (module) {
    'use strict';
    var appUtil = require('./../../helpers/util');

    module.exports = {
        init: function (app) {
            app.post('/v1/post', function (req, res) {
                // curl http://localhost:4000/v1/learn -X POST -H"Content-Type: application/json" -d'{"foo":"bar"}'
                var data = req.body;
                var query = (req.query);
                var json = new (appUtil.jsonView)();
                // some basic validation
                if (!(data && data.foo)) {
                    json.setMsg('Invalid Input');
                    res.status(400);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(json.render());
                    return;
                }

                json.setErrorCode(0);
                json.data(data);
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.end(json.render());

            });

            app.get('/v1/jade', function (req, res) {

                var data = req.body;
                var query = (req.query);
                var json = new (appUtil.jsonView)();
                // some basic validation
                if (!(data && data.foo)) {
                    json.setMsg('Invalid Input');
                    res.status(400);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(json.render());
                    return;
                }

                res.render('index', {title: 'Hey', message: 'Hello ' + data.foo});
            });

            app.get('/v1/login', function (req, res) {
                res.render('bootstrap');
            });

            app.post('/v1/login', function (req, res) {
                var data = req.body;
                var query = (req.query);
                var json = new (appUtil.jsonView)();

                console.log(data);
                // some basic validation
                if (!(data && data.username && data.password)) {
                    json.setMsg('Invalid Input');
                    res.status(400);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(json.render());
                    return;
                }

                json.setErrorCode(0);
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.end(json.render());
            });
        }
    };
})(module);