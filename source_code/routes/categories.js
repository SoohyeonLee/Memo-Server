var util = require('../util');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.route('/')
    .put(function (req, res, next) {
        /* 
        url         : ~/categories
        method      : put
        input       : header    - x-access-token
                      body      - category_name
        output      : success or err
        description : 분류 추가, 입력된 분류 정보를 DB에 insert 후 성공 여부 반환
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
    .get(function (req, res, next) {
        /* 
        url         : ~/categories
        method      : get
        input       : header    - x-access-token
                      body      - N/A
        output      : category list
        description : 분류 조회, 입력된 사용자의 분류 정보 목록 반환
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
        /* 
        url         : ~/categories
        method      : delete
        input       : header    - x-access-token
                      body      - category_name
        output      : success or err
        description : 분류 삭제, 입력된 분류 정보를 DB에서 delete 후 성공 여부 반환
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