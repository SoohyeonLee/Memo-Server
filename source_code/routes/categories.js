var util = require('../util');
var express = require('express');
var models = require('../models');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.route('/')
    .put(function (req, res, next) {

        var name = req.body['category_name'];

        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);

            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        models.categories.create(
            {
                user_id: decode.user_id,
                category_name: name
            })
            .then(result => {
                res.json(util.successTrue())
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });

    })
    .post(function (req, res, next) {
        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);

            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        models.categories.findAll(
            {
                attributes: [
                    'category_name'
                ],
                where: {
                    user_id: decode.user_id
                }
            })
            .then(result => {
                res.json(util.successTrue(result))
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });
    })
    .delete(function (req, res, next) {

        var name = req.body['category_name'];
        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);

            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        models.categories.destroy(
            {
                where: {
                    user_id: decode.user_id,
                    category_name: name
                }
            })
            .then(function () {
                res.json(util.successTrue())
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });
    })

module.exports = router