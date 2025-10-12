import courseService from "../services/courseService.js";

export async function isOwner(req, res, next) {
    const userId = req.user.id;
    const courseId = req.params.courseID;

    const course = await courseService.getOne(courseId);
    req.course = course;

    const isOwner = course.owner.equals(userId);

    if (!isOwner) {
        return res.redirect("/courses");
    }

    next();
}
