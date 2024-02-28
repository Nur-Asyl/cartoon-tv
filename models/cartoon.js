const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartoonSchema = new Schema({
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
    voteCount: { type: Number }
});

const Cartoon = mongoose.model('Cartoon', cartoonSchema);

module.exports = Cartoon;
