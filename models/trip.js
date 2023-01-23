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
    // travel arrangements schema,
    // stops schema    
}, {
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);