var util = require('../util');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.route('/')
    .put(function (req, res, next) {
        /* 
        url         : ~/todoes
        method      : put
        input       : header    - x-access-token
                      body      - N/A
        output      : success or err
        description : 할 일 추가, 입력된 할 일 정보를 DB에 insert 후 성공 여부 반환
        */
        var token = req.headers['x-access-token'];
        var result_JWT = '';
        var decord = '';

        result_JWT = util.verifyJWT(token)

        if (result_JWT.success == true) {
            decord = result_JWT.result;
        }
        else {
            return res.json(util.successFalse(result_JWT.result, 'Token 검증 실패'))
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
    .get(function (req, res, next) {
        /* 
        url         : ~/todoes
        method      : get
        input       : header    - x-access-token
                      body      - N/A
        output      : todo list
        description : 할 일 조회, 입력된 사용자의 할 일 정보 목록 반환
        */
        var token = req.headers['x-access-token'];
        var result_JWT = '';
        var decord = '';

        result_JWT = util.verifyJWT(token)

        if (result_JWT.success == true) {
            decord = result_JWT.result;
        }
        else {
            return res.json(util.successFalse(result_JWT.result, 'Token 검증 실패'))
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
        /* 
        url         : ~/todoes
        method      : patch
        input       : header    - x-access-token
                      body      - todo_id, category_name, todo_text, 
                                  todo_update_time, todo_target_time, todo_check
        output      : success or err
        description : 할 일 수정, 입력된 할 일 정보를 DB에 update 후 성공 여부 반환
        */
        var token = req.headers['x-access-token'];
        var result_JWT = '';
        var decord = '';

        result_JWT = util.verifyJWT(token)

        if (result_JWT.success == true) {
            decord = result_JWT.result;
        }
        else {
            return res.json(util.successFalse(result_JWT.result, 'Token 검증 실패'))
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
            })
            .then(result => {
                res.json(util.successTrue())
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });
    })
    .delete(function (req, res, next) {
        /* 
        url         : ~/todoes
        method      : delete
        input       : header    - x-access-token
                      body      - todo_id
        output      : success or err
        description : 할 일 삭제, 입력된 할 일 정보를 DB에서 delete 후 성공 여부 반환
        */
        var token = req.headers['x-access-token'];
        var result_JWT = '';
        var decord = '';

        result_JWT = util.verifyJWT(token)

        if (result_JWT.success == true) {
            decord = result_JWT.result;
        }
        else {
            return res.json(util.successFalse(result_JWT.result, 'Token 검증 실패'))
        }

        var id = req.headers['todo_id'];

        models.todoes.destroy(
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

router.route('/check')
    .patch(function (req, res, next) {
        /* 
        url         : ~/todoes/check
        method      : patch
        input       : header    - x-access-token
                      body      - todo_id, todo_check
        output      : success or err
        description : 할 일 확인, 입력된 할 일 수행 정보를 DB에 update 후 성공 여부 반환
        */
        var token = req.headers['x-access-token'];
        var result_JWT = '';
        var decord = '';

        result_JWT = util.verifyJWT(token)

        if (result_JWT.success == true) {
            decord = result_JWT.result;
        }
        else {
            return res.json(util.successFalse(result_JWT.result, 'Token 검증 실패'))
        }

        var uid = decode.user_id

        var id = req.body['todo_id'];
        var check = req.body['todo_check'];

        models.todoes.update(
            {
                todo_check: check
            },
            {
                where: {
                    todo_id: id,
                    user_id: uid
                }
            })
            .then(result => {
                res.json(util.successTrue())
            })
            .catch(function (err) {
                res.json(util.successFalse(err))
            });
    })

module.exports = router