const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post
    try {
      const hashtags = req.body.content.match(/#[^\s]+/g);
      const newPost = await db.Post.create({
        content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
        UserId: req.user.id,
      });
      if (hashtags) {
        const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({  //findOrCreate 찾을수 있는건 찾고 없는건 만들고
          where: { name: tag.slice(1).toLowerCase() },
        })));
        await newPost.addHashtags(result.map(r => r[0]));
      }
      // const User = await newPost.getUser();
      // newPost.User = User;
      // res.json(newPost);
      const fullPost = await db.Post.findOne({
        where: { id: newPost.id },
        include: [{
          model: db.User,
        }],
      });
      res.json(fullPost);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

router.post('/images', (req, res) => {    //이미지 등록

});

router.get('/:id/comments', async(req, res, next) => { //코멘트 가져오기
  try{
    const post = await db.Post.findOne({ where: {id:req.params.id}});  //게시글이 있는지 확인
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']], //정렬 순서
      include: [{
        model:db.User,
        attributes: ['id', 'nickname'],
      }],
    })
    return res.json(comments);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment', async(req, res, next) => {  //코멘트 작성
  try{
    if(!req.user){
      return res.status(401).send('로그인이 필요합니다.');
    }
    const post = await db.Post.findOne({ where: {id:req.params.id}});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      PostId:post.id,
      userId: req.user.id,
      content: req.body.content,
    })
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model:db.User,
        attributes:['id', 'nickname'],
      }]
    })
    return res.json(comment);
  }catch(e){
    console.error(e);
    next(e);
  }
});


module.exports = router