const mongoose = require('mongoose');

const TestArraySchema = new mongoose.Schema(
    {
        numberOfArrays: Number,
        array: Array,
    },
    {
        timestamps: true,
    },
);

const testArrayModel = mongoose.model('TestArrays', TestArraySchema);

module.exports = testArrayModel