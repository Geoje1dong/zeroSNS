const express =require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

});

router.post('/', async(req, res) => {    // 회원가입 
    try{

    } catch(e){
        console.log(e);
    }
});

router.get('/:id', (req, res) => {    //남의 정보 가져오는것

});

router.get('/logout', (req, res) => {   //로그 아웃
});

router.post('/login', (req, res) => { //로그인

});

router.get('/:id/follow', (req, res) => { //유저 팔로워

});

router.post('/:id/follow', (req, res) => {    //유저 팔로워 

});

router.delete('/:id/follow', (req, res) => {  //유저 팔로우 삭제

});

router.delete('/:id/follower', (req, res) => {    //유저 팔로워 삭제

});

router.get('/:id/posts', (req, res) => {  //유저 포스트

});

module.exports = Router;