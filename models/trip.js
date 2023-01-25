const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
    title: {
        type: String,
        // add default
    },
    startDate: {
        type: Date,
        // add default
    },
    endDate: {
        type: Date,
        // add default
    },
    location: {
        type: String,
        // google maps API
    },
    description: {
        type: String,
        // default same as title
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);