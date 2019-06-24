const express =require('express');
const morgan  = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter=require('./routes/user');
const postsAPIRouter=require('./routes/posts');
const postAPIRouter=require('./routes/post');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json());    //json 처리
app.use(express.urlencoded({extended:true}));    //form 처리
app.use(cors({
    origin:true,
    credentials:true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave:false,   //매번 세션 강제 저장
    saveUninitialized:false,    //빈 값도 저장 유무
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false, //https를 사용할때 ture
    },
    name: 'dkdlwk',
}));
app.use(passport.initialize());
app.use(passport.session());

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/post', postAPIRouter);

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});