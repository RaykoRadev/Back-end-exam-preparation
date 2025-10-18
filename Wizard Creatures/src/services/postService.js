import Post from "../model/Post.js";

export default {
    getAll() {
        return Post.find();
    },
};
