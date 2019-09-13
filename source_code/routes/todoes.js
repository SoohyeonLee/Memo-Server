var util = require('../util');
var express = require('express');
var models = require('../models');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.route('/')
    .put(function (req, res, next) {

        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);


            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        var name = req.body['category_name'];
        var text = req.body['todo_text'];
        var create = req.body['todo_create_time'];
        var target = req.body['todo_target_time'];

        models.todoes.create(
            {
                user_id: decode.user_id,
                category_name: name,
                todo_text: text,
                todo_create_time: create,
                todo_target_time: target,
                todo_check: 0
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

        models.todoes.findAll(
            {
                attributes: [
                    'todo_id', 'category_name', 'todo_text', 'todo_target_time', 'todo_check'
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
    .patch(function (req, res, next) {

        var token = req.body['token'];
        var decode = '';

        try {
            decode = jwt.verify(token, util.secret);

            // exp 체크 //

            //////////////

        } catch (err) {
            return res.json(util.successFalse(err, 'Token 검증 실패'))
        }

        var id = req.body['todo_id'];
        var name = req.body['category_name'];
        var text = req.body['todo_text'];
        var update = req.body['todo_update_time'];
        var target = req.body['todo_target_time'];
        var check = req.body['todo_check'];

        models.todoes.update(
            {
                todo_id: id,
                category_name: name,
                todo_text: text,
                todo_update_time: update,
                todo_target_time: target,
                todo_check: check
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

        var id = req.body['todo_id'];

        models.categories.destroy(
            {
                where: {
                    user_id: decode.user_id,
                    todo_id: id
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