/**
 * Created by easterCat on 2017/10/25.
 */

const mongoose = require('../db');

const Schema = mongoose.Schema;

let pictureSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required!']
    },
    filename: {
        type: String,
        required: [true, 'filename is required!']
    },
    path: {
        type: String,
        required: [true, 'path is required!']
    },
    size: {
        type: Number
    },
    type: {
        type: String
    },
    uploadDate: {
        type: Date
    },
});

const PictureModel = mongoose.model('Picture', pictureSchema);

module.exports = PictureModel;
