const express =require('express');
const morgan  = require('morgan');
const cors = require('cors');

const db = require('./models');
const userAPIRouter=require('./routes/user');
const postsAPIRouter=require('./routes/posts');
const postAPIRouter=require('./routes/post');

const app = express();
db.sequelize.sync();

app.use(morgan('dev'));
app.use(express.json());    //json 처리
app.use(express.urlencoded({extended:true}));    //form 처리
app.use(cors());

//api
app.use('/api/user', userAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/post', postAPIRouter);

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});