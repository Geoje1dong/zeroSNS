const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async(req, res, next) => {   //게시글 가져오기
    try{
        const posts = await db.Post.findAll({
            include: [{
                model:db.User,
                attributes:['id', 'nickname'],
            }],
            order:[['createdAt', 'DESC'], ['updatedAt', 'ASC']],  //DESC는 내림차순, ASC는 올림차순
        });
        res.json(posts)
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router