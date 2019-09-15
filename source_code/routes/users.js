var util = require('../util');
var express = require('express');
var models = require('../models');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.route('/')
    .put(function (req, res, next) {
        /* 
        url         : ~/users
        method      : put
        input       : header    - N/A
                      body      - user_id, user_pwd, user_name
        output      : success or err
        description : 회원 가입, 입력된 사용자 정보를 DB에 insert 후 성공 여부 반환
        */
        var id = req.body['user_id'];
        var pwd = req.body['user_pwd'];
        var name = req.body['user_name'];

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
    .get(function (req, res, next) {
        /* 
        url         : ~/users
        method      : get
        input       : header    - x-access-token
                      body      - N/A
        output      : user list
        description : 전체 유저 조회, 전체 유저 목록 반환
        */
        var token = req.headers['x-access-token'];
        var result_JWT = '';
        var decord = '';

        result_JWT = util.verifyJWT(token);

        if (result_JWT.success == true) {
            decord = result_JWT.result;
        }
        else {
            return res.json(util.successFalse(result_JWT.result, 'Token 검증 실패'))
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
        /* 
        url         : ~/users
        method      : patch
        input       : header    - x-access-token
                      body      - user_pwd, user_name
        output      : success or err
        description : 사용자 정보 수정, 입력된 사용자 정보를 DB에 update 후 성공 여부 반환
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

        var pwd = req.body['user_pwd']
        var name = req.body['user_name']

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
        /* 
        url         : ~/users
        method      : delete
        input       : header    - x-access-token
                      body      - 
        output      : 
        description : 
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

router.route('/check/:id')
    .get(function (req, res, next) {
        /* 
        url         : ~/users/check/:id
        method      : get
        input       : header    - 
                      body      - 
        output      : 
        description : 
        */
        var id = req.params.id;

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
                    res.json(util.successFalse())
            })
    })

router.route('/login')
    .post(function (req, res, next) {
        /* 
        url         : ~/users/login
        method      : post
        input       : header    - N/A
                      body      - user_id, user_pwd
        output      : 
        description : 
        */
        var id = req.body['user_id'];
        var pwd = req.body['user_pwd'];

        models.users.findAll(
            {
                attributes: [
                    'user_id',
                    'user_name'
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
                    expiresIn: '1d',
                    issuer: 'soohyeon',
                    subject: 'todo_service_token'
                }

                jwt.sign(payload, secret, option, function (err, token) {
                    if (err)
                        res.json(util.successFalse(err.message, '아이디 혹은 비밀번호가 틀렸습니다.'));
                    else
                        res.json(util.successTrue(token));
                })
            })
            .catch(err => {
                res.json(util.successFalse(err.message));
            })
    })

/* 
        url         : ~/users/:id/pwd
        method      : get
        input       : url       - user_id
                      header    - N/A
                      body      - N/A
        output      : 
        description : 
*/
/*
router.route('/:user_id/pwd')
    .get(function (req, res, next) {
        
        var id = req.params.id;

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
                    res.json(util.successFalse(null, '일치하는 아이디가 없습니다.'))
            })
    })
*/

module.exports = router