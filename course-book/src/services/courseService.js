import Course from "../models/Course.js";

export default {
    create(data) {
        return Course.create(data);
    },

    getAll() {
        return Course.find();
    },

    getOne(courseID) {
        return Course.findById(courseID);
    },

    attach(username, courseId) {
        return Course.findByIdAndUpdate(courseId, {
            $push: { signUpList: username },
        });
    },

    edit(courseId, data) {
        return Course.findByIdAndUpdate(courseId, data);
    },

    delete(courseId) {
        return Course.findByIdAndDelete(courseId);
    },

    signUp(userId) {
        return Course.find({ signUpList: userId });
    },

    created(userId) {
        return Course.find({ owner: userId });
    },

    getLastThree() {
        return Course.find().sort({ createdAt: -1 }).limit(3);
    },
};
