export default {
    setTitle(title) {
        this.pageTitle = title;
    },
    getTitle() {
        return this.pageTitle || "ToDo change the Title";
    },
};
