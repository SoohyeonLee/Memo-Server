var cors        = require('cors');
var mysql       = require('mysql');
var morgan      = require('morgan');
var express     = require('express');
var bodyParser  = require('body-parser');

var models = require('./models/index');

models.sequelize.sync().then( () => {
    console.log("Connection DB");
}).catch(err => {
    console.log("DB Error");
    console.log(err);
})

const app = express();

app.use(cors());

app.use(morgan('short')) //로그 미들웨어
app.use(express.static('./public')) //기본 파일 폴더 위치 설정
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({type: 'application/json'}));

var router_user = require('./routes/users.js')
var router_todo = require('./routes/todoes.js')
var router_category = require('./routes/categories.js')

app.use('/users', router_user)
app.use('/todoes', router_todo)
app.use('/categories', router_category)
 
app.listen(4000, () => {
    console.log('Server running at http://202.31.202.191:4000');
});