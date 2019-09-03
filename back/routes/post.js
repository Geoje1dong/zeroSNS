const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');
const router = express.Router();
const {isLoggedIn} = require('./middleware');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); //확장자 걸러내고 이름만 예) 피카츄.png ext = .png, basename= 피카츄
      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits:{fileSize:20 * 1024 * 1024},
})

router.post('/',isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post //post 작성
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
    if(req.body.image){ //멀터에서 이미지 주소를 여러개 올리면 image:[배열로]
      if(Array.isArray(req.body.image)){
        const images = await Promise.all(req.body.image.map((image) => {
          return db.Image.create({src:image});
        }));
        await newPost.addImages(images);
      }else{  //이미지를 하나만 올리면 image: 주소
        const image = await db.Image.create({src:req.body.image});
        await newPost.addImage(image);
      }
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
      },{
        model:db.Image
      }],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', upload.array('image'), (req, res) => {    //이미지 업로드
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

router.delete('/:id', isLoggedIn, async (req, res, next) => { //게시글 삭제
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
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
      order: [['createdAt', 'ASC']],  //정렬순서
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
    })
    return res.json(comments);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment',isLoggedIn, async(req, res, next) => {  //코멘트 작성
  try{
    const post = await db.Post.findOne({ where: {id:req.params.id}});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      PostId:post.id,
      UserId: req.user.id,
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

//좋아요 누르기
router.post('/:id/like', isLoggedIn, async(req, res, next) => { 
  try{
    const post = await db.Post.findOne({where: {id:req.params.id}});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await post.addLiker(req.user.id);
    res.json({userId: req.user.id});
  }catch(e){
    console.error(e);
    next(e);
  }
});

//좋아요 취소
router.delete('/:id/like', isLoggedIn, async(req, res, next) => {
  try{
    const post = await db.Post.findOne({where: {id:req.params.id}});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    await post.removeLiker(req.user.id);
    res.json({userId: req.user.id});
  }catch(e){
    console.error(e);
    next(e);
  }
});

//retweet
router.post('/:id/retweet', isLoggedIn, async(req, res, next) => {
  try{
    //post 체크
    const post = await db.Post.findOne({
      where:{id:req.params.id},
      include:[{
        model:db.Post,
        as:'Retweet'
      }]
    });
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
      return res.status(403).send('자신의 글을 리트윗할 수 없습니다.');
    }
    //리트윗 확인 여부 체크
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where:{
        UserId:req.user.id,
        RetweetId:retweetTargetId,
      },
    });
    if(exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content:'retweet',
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where:{ id: retweet.id},
      include:[
        {
          model:db.User,
          attributes: ['id', 'nickname']
        },{
          model:db.Post,
          as:'Retweet',
          include:[
            {
              model:db.User,
              attributes: ['id', 'nickname']
            },{
              model:db.Image
            }
          ]
        }
      ]
    });
    res.json(retweetWithPrevPost);
  }catch(e){
    console.error(e);
    next(e);
  }
})

module.exports = router