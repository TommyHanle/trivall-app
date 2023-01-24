const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stopSchema = new Schema({
    title: {
        type: String,
        // add default
    },
    dateTime: {
        type: Date,
        // add default
    },
    location: {
        type: String,
        // google maps API
    },
    details: {
        type: String,
        // default same as title
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Stop', stopSchema);