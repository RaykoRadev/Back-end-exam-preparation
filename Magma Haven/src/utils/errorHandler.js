export default function getErrorMessage(err) {
    return err.errors ? Object.values(err.errors)[0].message : err.message;
}
