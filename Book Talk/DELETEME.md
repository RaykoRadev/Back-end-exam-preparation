match: [
/^https?:\/\//,
"Animal's imageUrl has to be start with http://... or https://...!",
],

seerch BONUS

export async function getAll(filter = {}) {
let result = await Animal.find();
if (filter.search) {
result = result.filter((el) =>
el.location.toLowerCase().includes(filter.search.toLowerCase())
);
}

    return result;

}
