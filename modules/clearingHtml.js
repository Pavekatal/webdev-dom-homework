export const clearingHtml = (str) => {
    if (typeof str !== 'string') {
        return ''
    }

    const isQuote = str.includes('<QUOTE>') && str.includes('</QUOTE>')

    if (isQuote) {
        return str
            .replaceAll(/<(?!\/?QUOTE\b)[^>]*>/g, '')
            .replaceAll('&', '')
            .replaceAll('"', '')
            .replaceAll("'", '')
    } else {
        return str
            .replaceAll(/<[^>]+>/g, '')
            .replaceAll('&', '')
            .replaceAll('"', '')
            .replaceAll("'", '')
    }
}
