var mongoose = require('mongoose');

var userItemsSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    likedItems: [String],
    wishList: [String],
    dislikedItems: [String],
    lastLikedItems: String,
});

module.exports = mongoose.model('UserItems', userSchema);
