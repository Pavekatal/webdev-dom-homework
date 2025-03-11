export const clearingHtml = (str) => {
    if (typeof str !== 'string') {
        return ''
    }
    return str.replaceAll('&', '').replaceAll('"', '').replaceAll("'", '')
}
