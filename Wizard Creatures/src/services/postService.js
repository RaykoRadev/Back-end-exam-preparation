import Post from "../model/Post.js";
import checkVotedF from "../utils/checkVotes.js";

export default {
    getAll() {
        return Post.find();
    },

    create(data, userId) {
        return Post.create({ ...data, owner: userId });
    },

    async getOne(postId, userId) {
        const post = await Post.findById(postId).populate(
            {
                path: "owner",
                select: "firstName lastName",
                path: "votes",
                select: "email ",
            }
            // { path: "votes", select: "email" }
        );
        console.log(post.votes);
        const isOwner = post.owner.equals(userId);
        const countVotes = post.votes.length;
        // const voted = checkVotedF(post.votes, userId);
        const voted = post.votes.includes({ _id: userId });

        return { post, isOwner, countVotes, voted };
    },

    edit(postId, data) {
        return Post.findByIdAndUpdate(postId, data, { runValidators: true });
    },

    vote(postId, userId) {
        return Post.findByIdAndUpdate(postId, { $push: { votes: userId } });
    },

    delete(postId, userId) {
        // return Post.deleteOne({ id: postId, owner: userId });
        return Post.findByIdAndDelete(postId);
    },
};
