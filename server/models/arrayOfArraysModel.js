const mongoose = require('mongoose');

const ArrayOfArraysSchema = new mongoose.Schema(
    {
        numberOfArrays: Number,
        array: Array
    },
    {
        timestamps: true,
    },
);

const arrayOfArraysModel = mongoose.model('ArrayOfArrays', ArrayOfArraysSchema);

module.exports = arrayOfArraysModel