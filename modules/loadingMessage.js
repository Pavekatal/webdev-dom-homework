export const showLoadingMessage = () => {
    const loadingMessage = document.createElement('div')
    loadingMessage.className = 'loading-message'
    loadingMessage.textContent = 'Комментарии загружаются...'
    document.body.appendChild(loadingMessage)
    console.log('Элемент загрузки добавлен')
    return loadingMessage
}

export const hideLoadingMessage = (loadingMessage) => {
    if (loadingMessage) {
        document.body.removeChild(loadingMessage)
        console.log('Элемент загрузки удален')
    }
}
