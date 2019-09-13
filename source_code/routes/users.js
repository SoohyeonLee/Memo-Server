var util = require('../util');
var express = require('express');
var models = require('../models');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.route('/')
    .put(function (req, res, next) {

        var id = req.body['user_id']
        var pwd = req.body['user_pwd']
        var name = req.body['user_name']

        models.users.create(
            {
                user_id: id,
                user_pwd: pwd,
                user_name: name
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

        models.users.findAll()
            .then(result => {
                res.json(util.successTrue(result))
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });

    })
    .patch(function (req, res, next) {

        var pwd = req.body['user_pwd']
        var name = req.body['user_name']

        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);

            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        models.users.update(
            {
                user_pwd: pwd,
                user_name: name
            },
            {
                where: { user_id: decode.user_id }
            }
        )
            .then(result => {
                res.json(util.successTrue())
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });

    })
    .delete(function (req, res, next) {

        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);

            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        models.users.destroy(
            {
                where: {
                    user_id: decode.user_id
                }
            })
            .then(function () {
                res.json(util.successTrue())
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });
    })

router.route('/checkid')
    .post(function (req, res, next) {

        var id = req.body['id'];

        models.users.findAndCountAll(
            {
                where: {
                    user_id: id
                }
            })
            .then(result => {
                if (result.count != 1)
                    res.json(util.successTrue())
                else
                    res.json(util.successFalse(null, '아이디 혹은 비밀번호가 틀렸습니다.'))
            })
    })

router.route('/login')
    .post(function (req, res, next) {

        var id = req.body['user_id'];
        var pwd = req.body['user_pwd'];

        models.users.findAll(
            {
                attributes: [
                    'user_id', 'user_name'
                ],
                where: {
                    user_id: id,
                    user_pwd: pwd
                }
            })
            .then(result => {

                var payload = {
                    user_id: result[0].user_id,
                    user_name: result[0].user_name
                }

                const secret = util.secret

                var option = {
                    expiresIn: '3d',
                    issuer: 'soohyeon',
                    subject: 'userToken'
                }

                jwt.sign(payload, secret, option, function (err, token) {
                    if (err) 
                        res.json(util.successFalse(err.message));
                    else
                        res.json(util.successTrue(token));
                })
            })
            .catch(err => {
                res.json(util.successFalse(err.message));
            })
    })

module.exports = router