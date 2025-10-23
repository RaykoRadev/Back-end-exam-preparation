import Publish from "../models/Publish.js";

export function getAll() {
    return Publish.find({ isClosed: false });
}

export function create(data, userId) {
    return Publish.create({ ...data, author: userId, isClosed: false });
}

export async function getOne(auctId, userId, bid = null) {
    const item = await Publish.findById(auctId).populate("bidder");

    const isOwner = item.author.equals(userId);
    const isBided = item.bidder[0] === userId;
    const name = item.bidder[2];
    const result = { item, isOwner, isBided, name };
    return result;
}

export async function updateBid(auctId, bid, userId, username) {
    return Publish.findByIdAndUpdate(auctId, {
        bidder: [userId, bid, username],
        price: bid,
    });
}

export function edit(auctId, data) {
    return Publish.findByIdAndUpdate(auctId, data, { runValidators: true });
}

export function deleteF(auctId, userId) {
    return Publish.deleteOne({ _id: auctId, author: userId });
}

export function close(auctId) {
    return Publish.findByIdAndUpdate(auctId, { isClosed: true });
}

export function getClosed(userId) {
    return Publish.find({ isClosed: true, author: userId });
}
