/*****************
 * Import Modules*
 *****************/

const express           = require('express')
    , exphbs            = require('express-handlebars')
    , app               = express()
    , mongoose          = require('mongoose')
    , bodyParser        = require('body-parser')
    , fileupload        = require('express-fileupload')
    , expressSession    = require('express-session')
    , MongoStore        = require('connect-mongo')
    , connectFlash      = require('connect-flash')
    , { stripTags }     = require('./helpers/hbs')


/***************************
 * Port heroku / localhost *
 ***************************/

const port              = process.env.PORT || 3000


    
/*********************
 * Import Controller *
 *********************/

// Page
const homePage                  = require('./controllers/homePage')
    , articlePostController     = require('./controllers/articlePost')
    , articleAddController      = require('./controllers/articleAdd')
    , articleSingleController   = require('./controllers/articleSingle')
    , contactPage               = require('./controllers/contactPage')
    , articleEditPage           = require('./controllers/articleEdit')
    , articleEditPost           = require('./controllers/articleEditPost')

// User
const userLogout                = require('./controllers/userLogout')
    , userCreateController      = require('./controllers/userCreate')
    , userRegisterController    = require('./controllers/userRegister')
    , userLoginController       = require('./controllers/userLogin')
    , userLoginAuthController   = require('./controllers/userLoginAuth')



/**************
 * Middleware *
 **************/
const auth                  = require("./Middleware/auth")
    , redirectAuthSucess    = require("./Middleware/redirectAuthSucess")
    , articleValidPost      = require('./Middleware/articleValidPost')



/************
 * database *
 ************/

// const urlDb         = 'mongodb://localhost:27017/blog'
const urlDb         = 'mongodb+srv://admin:admin@cluster0-bmsok.mongodb.net/test?retryWrites=true&w=majority '
    , mongoStore    = MongoStore(expressSession)

mongoose.connect(urlDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});



/*********************
* config depedencies *
**********************/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(fileupload())
app.use(connectFlash())
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )
}))

var Handlebars = require("handlebars")
var MomentHandler = require("handlebars.moment")
MomentHandler.registerHelpers(Handlebars)




/**************
 * templating *
 **************/
app.engine('hbs', exphbs({
    extname: 'hbs',
    helpers: {
        stripTags: stripTags,
    },
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs');

app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})

Handlebars.registerHelper('limit', function(arr, limit){
    if(!Array.isArray(arr)) { return []; }
    return arr.slice( -limit ).reverse();
})

// Handlebars.registerHelper('limit', function(arr, limit){
//     // const arrT =  new Array(arr)
//     arr.slice(-limit ).reverse()
// })



/*********
 * route *
 *********/


// home
app.get("/", homePage)

//contact
app.get("/contact", contactPage)


// articles
app.get("/articles/:id", articleSingleController)
app.get("/article/add", auth, articleAddController)
app.post("/articles/post", auth, articleValidPost, articlePostController)
app.get("/articles/edit/:id", articleEditPage)
app.post("/articles/update/:id", articleEditPost)

//users
app.get("/user/create", redirectAuthSucess, userCreateController)
app.post("/user/register", redirectAuthSucess, userRegisterController)
app.get("/user/login", redirectAuthSucess, userLoginController)
app.post("/user/loginAuth", redirectAuthSucess, userLoginAuthController)
app.get('/user/logout', userLogout)

//error404
app.use((req, res) => {
    res.render('error404')
})

//nodemon 
app.listen(port, function () {
    console.log("le serveur tourne sur le port 3000");

})


