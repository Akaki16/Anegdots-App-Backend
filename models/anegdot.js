const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define anegdot schema
const anegdotSchema = new Schema({
    text: { type: String, required: true },
    category: { type: String, required: true },
    likes: { type: Number, required: true }
});

// transform anegdot schema
anegdotSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v
    }
});

// define anegdot model which extends anegdot schema
const Anegdot = mongoose.model('Anegdot', anegdotSchema);

// expot anegdot model
module.exports = Anegdot;