const express =require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

router.post('/logout', (req, res) => {   //로그 아웃
    req.logout();
    req.session.destroy();
    res.send('로그아웃 성공');
});

router.post('/login', (req, res, next) => { //로그인
    passport.authenticate('local', (err,user,info) => { //서버에러, 유저정보, 로직상의 에러
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, (loginErr) => {
            if(loginErr) {
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return res.json(filteredUser);
        });
    })(req,res,next);
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