export default function extractEmails(votesArr) {
    const emailArr = [];
    const mapped = votesArr.map((el) => {
        emailArr.push(el.email);
    });

    return emailArr;
}
