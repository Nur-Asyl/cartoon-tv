# Cartoon Unitoon TV
See your favorite cartoons :)
# DEPLOY
https://cartoon-tv.onrender.com/cartoons
## Dependencies
npm install axios express body-parser ejs path  <br/>
npm install newsapi ejs sessions mongoose bcrypt method-override @google-cloud/translate<br/>


port -> 3000

## Admin
Username: Botka
Password: 123
AdminRoutes: {
    ('/admin')
    ('admin/cartoons')
}

## Database (MongoDB)
Mongoose (ODM) <br/>
Schemes: <br/>
User, Cartoon


const userSchema = new Schema({<br/>
    username: {type: String,required: true},
    password: {type: String,required: true,set: (password) => bcrypt.hashSync(password, 10)},
    creationDate: {type: Date,required: true},
    updatedDate: {type: Date},
    deletionDate: {type: Date},
    adminStatus: {type: Boolean,},
    recentlyViewed: {type: Array}<br/>
});
<br/>

const cartoonSchema = new Schema({<br/>
    id: { type: Number },
    name: { type: String, required: true },
    posterPath: { type: String},
    rating: { type: Number },
    adult: { type: Boolean},
    backdropPath: { type: String, default: '' },
    genres: [{ type: String }],
    originCountry: [{ type: String }],
    originalLanguage: { type: String },
    originalName: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    firstAirDate: { type: Date },
    voteCount: { type: Number }<br/>
});<br/>


## Routes
adminCartoonRoutes <br/>
adminRoutes <br/>
userRoutes <br/>
cartoonRoutes <br/>

## Middlewares
adminMiddleware <br/>
authMiddleware <br/>

## API's
News API <br/>
Google Cloud Translate <br/>
TMDb <br/>
OMDb <br/>


