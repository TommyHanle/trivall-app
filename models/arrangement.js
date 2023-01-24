const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arrangementSchema = new Schema({
    type: {
        type: String,
        // add default
    },
    dateTime: {
        type: Date,
        // add default
    },
    location: {
        type: String,
        // airport API?
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

module.exports = mongoose.model('Arrangement', arrangementSchema);