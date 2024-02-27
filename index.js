const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// server
const app = express();
const port = process.env.PORT || 3000;

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

// engines/ parsers/ static files/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


// session
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// routes
const userRoutes = require('./routes/userRoutes');
const cartoonRoutes = require('./routes/cartoonRoutes');
app.use('/', cartoonRoutes);
app.use('/user', userRoutes);

// launch
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})


