import postService from "../services/postService.js";

export async function isOwnerF(req, res, next) {
    const postId = req.params.postId;

    try {
        const { post, isOwner } = await postService.getOne(postId);
        req.post = post;
        return next();
    } catch (err) {
        res.render("posts/catalog", {
            error: getErrorMessage(err),
        });
    }
}
