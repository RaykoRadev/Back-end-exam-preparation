import Post from "../model/Post.js";

export default {
    getAll() {
        return Post.find();
    },

    create(data, userId) {
        return Post.create({ ...data, owner: userId });
    },

    async getOne(postId, userId) {
        const post = await Post.findById(postId).populate({
            path: "owner",
            select: "firstName lastName",
        });

        const isOwner = post.owner.equals(userId);
        const countVotes = post.votes.length;

        return { post, isOwner, countVotes };
    },

    edit(postId, data) {
        return Post.findByIdAndUpdate(postId, data, { runValidators: true });
    },

    vote(postId, userId) {
        return Post.findByIdAndUpdate(postId, { $push: { votes: userId } });
    },
};
