const express =require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();
const {isLoggedIn} = require('./middleware');

router.get('/',isLoggedIn, (req, res) => { //사용자 정보 가져오기
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});

router.get('/:id', async(req, res, next) => {    //남의 정보 가져오는것
    try{
        const user = await db.User.findOne({
            where:{id:parseInt(req.params.id, 10)},
            include:[{
                model:db.Post,
                attributes:['id'],
                as:'Posts'
            },{
                model:db.User,
                attributes:['id'],
                as:'Followings'
            },{
                model:db.User,
                attributes:['id'],
                as:'Followers'
            },],
            attributes:['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.json(jsonUser);
    }catch(e){
        console.error(e);
        next(e)
    }
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
        return res.status(200).json(newUser);
    } catch(e){
        console.log(e);
        return next(e);
    }
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
        return req.login(user, async(loginErr) => {
            try{
                if(loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: {id: user.id},
                    include: [{
                        model:db.Post,
                        as:'Posts',
                        attributes:['id'],
                    },{
                        model:db.User,
                        as:'Followings',
                        attributes:['id'],
                    },{
                        model:db.User,
                        as:'Followers',
                        attributes:['id'],
                    }],
                    attributes:['id', 'nickname', 'userId'],
                });
                return res.json(fullUser);
            }catch(e){
                next(e);
            }
        });
    })(req,res,next);
});

router.get('/:id/follow', (req, res) => { //유저 팔로워

});

router.post('/:id/follow', isLoggedIn, async(req, res, next) => {    //유저 팔로워 
    try{
        const me = await db.User.findOne({
            where: {id: req.user.id},
        });
        await me.addFollowing(req.params.id);
        res.send(req.params.id);
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.delete('/:id/follow', isLoggedIn, async(req, res, next) => {  //유저 팔로우 삭제
    try{
        const me = await db.User.findOne({
            where: {id: req.user.id}
        })
        await me.removeFollowing(req.params.id);
        res.send(req.params.id);
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.delete('/:id/follower', (req, res) => {    //유저 팔로워 삭제

});

router.get('/:id/posts', async(req, res, next) => {  //유저 포스트
    try{
        const posts = await db.Post.findAll({
            where:{
                UserId: parseInt(req.params.id, 10),
                RetweetId:null,    //리트윗 게시물 허용하지 않음
            },
            include: [{
                model:db.User,
                attributes:['id', 'nickname'],
            },{
                model:db.Image
            },{
                model:db.User,
                through:'Like',
                as:'Likers',
                attributes:['id']
            }]
        });
        res.json(posts);
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;