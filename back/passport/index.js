const passport = require('passport');
const db = require('../models');
const local = require('./local');


module.exports = () => {
    passport.serializeUser((user, done) => {  //서버에 [{ id:3, cookie:'asdke'}] cookie 라는 특정 값을 만들어 프론트에 보내주며 프론트는 이 정보만 가지고 있다가 필요 정보가 있을때 cookie 값을 백엔드에 보내면
        return done(null, user.id);
    });

    passport.deserializeUser( async(id, done) => {  // deserializeUser 를 통해 cookie 값으로 다시 user 정보를 가져온다.
        try{
            const user = await db.User.findOne({
                where: { id },
            });
            return done(null, user); // req.user
        } catch (e){
            console.error(e);
            return done(e);
        }
    });
    local();
};

//요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
//실무에서는 deserializeUser 결과물 캐싱(해야 할 필요가 있음)