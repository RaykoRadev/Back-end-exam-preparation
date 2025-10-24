[x] Install dependencies `npm i`

-   [x] Remove old resources and add new resources `/src/public`
-   [x] Add html files to the views folder
-   [x] Rename database name
-   [x] Replace layout
    -   [x] Dynamic title
    -   [x] Fix resource routes
    -   [x] Error notification
    -   [x] Body
    -   [x] Dynamic Navigation
-   [x] Replace home page
-   [x] Modify navigation links
-   [x] Modify User model
-   [x] Modify login and register controller
-   [x] Modify login and register service
-   [x] Modify token generation
-   [x] Modify login and register error handlers
-   [x] Replace login page
-   [x] Replace register page
-   [x] Replace 404 page

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
