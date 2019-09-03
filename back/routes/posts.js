const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async(req, res, next) => {   //게시글 가져오기
    try{
        let where = {};
        if (parseInt(req.query.lastId, 10)) {
        where = {
            id: {
            [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
            },
        };
        }
        // let where = {};
        // const lastId = parseInt(req.query.lastId, 10);
        // if(lastId){
        //     where = {
        //         id:{
        //             [db.Sequelize.Op.lt]:lastId //lt 작을때
        //         }
        //     }
        // }
        const posts = await db.Post.findAll({
            where,
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
            },{
                model:db.Post,
                as:'Retweet',
                include:[{
                    model:db.User,
                    attributes:['id', 'nickname']
                },{
                    model:db.Image
                }]
            }],
            order:[['createdAt', 'DESC'], ['updatedAt', 'ASC']],  //DESC는 내림차순, ASC는 올림차순
            limit: parseInt(req.query.limit, 10),
        });
        res.json(posts)
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router