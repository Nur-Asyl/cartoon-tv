const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var methodOverride = require('method-override')

// server
const app = express();
const port = process.env.PORT || 3000;
app.use(methodOverride('_method'));


// engines/ parsers/ static files/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// translator
// const i18n = require('i18n');
// const path = require('path');

// i18n.configure({
//     locales: ['en', 'ru'],
//     directory: path.join(__dirname, 'locales'),
//     defaultLocale: 'en',
//     cookie: 'lang',
//     queryParameter: 'lang'
// });

// app.use(i18n.init);


// mongoose
const mongoose = require('mongoose');
const dbURL = "mongodb://localhost:27017/cartoon_tv";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbURL, connectionParams).then(()=>{
    console.info("Connected to the MongoDB")
    }).catch((e)=>{
        console.log("Error:", e);
    });


// session
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// middlewares
const isAdmin = require('./middlewares/adminMiddleware')

// routes
const userRoutes = require('./routes/userRoutes');
const cartoonRoutes = require('./routes/cartoonRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminCartoonRoutes = require('./routes/adminCartoonRoutes');

app.use('/', cartoonRoutes);
app.use('/user', userRoutes);
app.use('/admin', isAdmin, adminRoutes)
app.use('/admin', isAdmin, adminCartoonRoutes)

// launch
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})


