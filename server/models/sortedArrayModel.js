const mongoose = require('mongoose');

const SortedArraySchema = new mongoose.Schema(
    {
        array: Array,
    },
    {
        timestamps: true,
    },
);

const sortedArrayModel = mongoose.model('SortedArray', SortedArraySchema);

module.exports = sortedArrayModel