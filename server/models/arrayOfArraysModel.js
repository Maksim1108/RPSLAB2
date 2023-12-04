import mongoose from 'mongoose';

const ArrayOfArraysSchema = new mongoose.Schema(
    {
        numberOfArrays: Number,
        array: Array,
    },
    {
        timestamps: true,
    },
);

export const arrayOfArraysModel = mongoose.model('ArrayOfArrays', ArrayOfArraysSchema);
