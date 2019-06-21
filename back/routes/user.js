const express =require('express');
const db = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res) => { //사용자 정보 가져오기

});

router.post('/', async(req, res, next) => {    // 회원가입 
    try{
        const exUser = await db.User.findOne({
            where: {
                userId:req.body.userId, //userId에 id가 있는지 없는 확인
            },
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);    //salt 10~13 사이로
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch(e){
        console.log(e);
        return next(e);
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

module.exports = router;