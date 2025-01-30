export function convertToNaira(kobo) {
    let naira = kobo / 100;
    return naira.toFixed(2);
}