import Animal from "../models/Animal.js";

export async function getAll(filter = {}) {
    let result = await Animal.find();
    if (filter.search) {
        result = result.filter((el) =>
            el.location.toLowerCase().includes(filter.search.toLowerCase())
        );
    }

    return result;
}

export async function getSorted() {
    return Animal.find().sort("-1").limit(3);
}

export async function create(data, owner) {
    return Animal.create({ ...data, owner });
}

export async function getOne(anmlId, userId) {
    const animal = await Animal.findById(anmlId);
    const ownerId = animal.owner;
    const isOwner = ownerId.equals(userId);
    const alreadyDon = animal.donation.includes(userId);

    const result = { animal, isOwner, alreadyDon };
    return result;
}

export async function edit(anmlId, data) {
    return Animal.findByIdAndUpdate(anmlId, data, { runValidators: true });
}

export async function deleteOne(anmlId, userId) {
    return Animal.deleteOne({ owner: userId, _id: anmlId });
}

export async function donate(anmlId, userId) {
    return Animal.findByIdAndUpdate(anmlId, { $push: { donation: userId } });
}
