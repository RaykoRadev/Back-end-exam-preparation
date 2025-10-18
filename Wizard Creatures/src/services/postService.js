import Post from "../model/Post.js";

export default {
    getAll() {
        return Post.find();
    },

    create(data, userId) {
        return Post.create({ ...data, owner: userId });
    },
};
