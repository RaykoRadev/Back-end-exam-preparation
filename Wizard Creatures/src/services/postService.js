import Post from "../model/Post.js";
import extractEmails from "../utils/checkVotes.js";

export default {
    getAll() {
        return Post.find();
    },

    create(data, userId) {
        return Post.create({ ...data, owner: userId });
    },

    async getOne(postId, userId, userEmail) {
        const post = await Post.findById(postId).populate({
            path: "owner",
            select: "firstName lastName",
            path: "votes",
            select: "email ",
        });

        const isOwner = post.owner.equals(userId);
        const countVotes = post.votes.length;
        const emails = extractEmails(post.votes);
        const voted = emails.includes(userEmail);

        return { post, isOwner, countVotes, voted, emails };
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
