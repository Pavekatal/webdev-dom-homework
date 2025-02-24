export const clearingHtml = (str) => {
    return str
        .replaceAll('<', '')
        .replaceAll('>', '')
        .replaceAll('&', '')
        .replaceAll('"', '')
        .replaceAll("'", '')
        .replaceAll('/', '')
}
