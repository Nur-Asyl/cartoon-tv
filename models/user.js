const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: (password) => bcrypt.hashSync(password, 10)
    },
    creationDate: {
        type: Date,
        required: true
    },
    updatedDate: {
        type: Date
    },
    deletionDate: {
        type: Date
    },
    adminStatus: {
        type: Boolean,
    },
    recentlyViewed: {
        type: Array
    }
});

userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);