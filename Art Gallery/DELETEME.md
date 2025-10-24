[x] Install dependencies `npm i`

-   [x] Remove old resources and add new resources `/src/public`
-   [x] Add html files to the views folder
-   [ ] Rename database name
-   [ ] Replace layout
    -   [ ] Dynamic title
    -   [ ] Fix resource routes
    -   [ ] Error notification
    -   [ ] Body
    -   [ ] Dynamic Navigation
-   [ ] Replace home page
-   [ ] Modify navigation links
-   [ ] Modify User model
-   [ ] Modify login and register controller
-   [ ] Modify login and register service
-   [ ] Modify token generation
-   [ ] Modify login and register error handlers
-   [ ] Replace login page
-   [ ] Replace register page
-   [ ] Replace 404 page

match: [
/^https?:\/\//,
"Animal's imageUrl has to be start with http://... or https://...!",
],

---

seerch BONUS by one specific criteria

export async function getAll(filter = {}) {
let result = await Animal.find();
if (filter.search) {
result = result.filter((el) =>
el.location.toLowerCase().includes(filter.search.toLowerCase())
);
}

    return result;

}

---

to get all liked, donated, etc stuff for one user

Blog.find().in('followers', userId)

---

when have to show emails of the users:

after we take the item, use map on it

blog.followers.map(follower => follower.email). join(', ')

---

to check if the user is liked, voted ... alredy

isFollowing = blog.followers.some(follower => follower.equals(userId))

---

not owner to edit error handle

if(!blog.owner.equals(req.user.id)){
throw new {
statusCode: 401,
message: 'You can edit only if you are owner';
}
}
