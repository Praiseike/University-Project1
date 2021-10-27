const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const connectDB = require('./config/mongoDB')
const session = require('express-session')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash');
const colors = require('colors')
const passport = require('passport')
const { Store } = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express()




//load the config file 
dotenv.config({ path: './config/config.env' })

//passport files
require('./passportjs/passport-google')(passport)
require('./passportjs/passport-facebook')(passport)
require('./passportjs/passport-twitter')(passport)
require('./passportjs/passport-local')(passport)
require('./passportjs/passport-github')(passport)
// calling the database function 
connectDB();

//body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect-flash middleware
app.use(flash());


//handlebars middleware
app.engine('.hbs', exphbs({ helpers: require('./helpers/hbs'), defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');



//public file path
app.use(express.static(path.join(__dirname, 'public')))

//serving images statically
app.use('/thumbnails', express.static(path.join(__dirname, 'thumbnails')))

//serving videos statically
app.use('/videos', express.static(path.join(__dirname, 'videos')))


//sessions middleware (must be above passport middleware)
app.use(session({
  secret: 'y6tjyyh565/.7/6.8/uk6/u8',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })// store your sessions here
}))

//passportjs middleware
app.use(passport.initialize());
app.use(passport.session());

//method oberiide
app.use(methodOverride('_method'))

//mount routes 
app.use("/", require('./routes/index'))
app.use("/auth", require('./routes/auth'))
app.use("/videos", require('./routes/videos'))

const PORT = process.env.PORT || 3000
app.listen(PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT} `.yellow.underline.bold)
)


