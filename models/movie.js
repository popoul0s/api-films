const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    year: Number,
    genre: String,
    status: {
        type: String,
        enum: ['à voir', 'vu'],
        default: 'à voir'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    review: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
