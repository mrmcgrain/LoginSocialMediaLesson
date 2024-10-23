const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const FeedSchema = new Schema(
{

    authorName: String,
    authorId:  mongoose.Schema.Types.ObjectId,
    feedContent: String,
    comments: [{}],
    created: Date,
    likes: Number,
    liked: []
    // img: String
}
)

const Feed = mongoose.model("Feed", FeedSchema);
module.exports = Feed;