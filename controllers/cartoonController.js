const Cartoon = require('../models/cartoon');

exports.createCartoon = async (cartoonData) => {
    try {
        const cartoon = new Cartoon(cartoonData);
        await cartoon.save();
        return cartoon;
    } catch (error) {
        console.error('Error creating cartoon:', error);
        throw error;
    }
};

exports.getCartoons = async () => {
    try {
        return await Cartoon.find({});
    } catch (error) {
        console.error('Error getting cartoons:', error);
        throw error;
    }
};

exports.getCartoonById = async (id) => {
    try {
        return await Cartoon.findOne({ "id": id });
    } catch (error) {
        console.error('Error getting cartoon by ID:', error);
        throw error;
    }
};

exports.getCartoonByName = async (cartoonName) => {
    try {
        console.log(cartoonName)
        return await Cartoon.findOne({ name: cartoonName });
    } catch (error) {
        console.error('Error getting cartoon by Name:', error);
        throw error;
    }
};

exports.updateCartoon = async (name, updatedCartoonData) => {
    try {
        return await Cartoon.findOneAndUpdate({"name": name}, updatedCartoonData, { new: true });
    } catch (error) {
        console.error('Error updating cartoon:', error);
        throw error;
    }
};

exports.deleteCartoon = async (name) => {
    try {
        return await Cartoon.findOneAndDelete({"name": name});
    } catch (error) {
        console.error('Error deleting cartoon:', error);
        throw error;
    }
};
