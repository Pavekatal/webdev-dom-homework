export const showLoadingMessage = () => {
    const container = document.querySelector('.container')
    const loadingMessage = document.createElement('div')
    const addForm = document.querySelector('.add-form')

    loadingMessage.className = 'loading-message'
    loadingMessage.textContent = 'Загрузка...'

    container.insertBefore(loadingMessage, addForm)
    console.log('Элемент загрузки добавлен')
    return loadingMessage
}

export const hideLoadingMessage = (loadingMessage) => {
    if (loadingMessage) {
        const container = document.querySelector('.container')
        container.removeChild(loadingMessage)
        console.log('Элемент загрузки удален')
    }
}

export const showAddedMessage = () => {
    // const container = document.querySelector('.container')
    // const loadingMessage = document.createElement('div')
    // const addForm = document.querySelector('.add-form')

    // loadingMessage.className = 'loading-message'
    // loadingMessage.textContent = 'Загрузка...'

    // container.insertBefore(loadingMessage, addForm)
    // console.log('Элемент загрузки добавлен')
    // return loadingMessage

    const container = document.querySelector('.container')
    const addedMessage = document.createElement('div')
    const addForm = document.querySelector('.add-form')

    addedMessage.className = 'loading-message'
    addedMessage.textContent = 'Добавление комментария...'

    container.insertBefore(addedMessage, addForm)
    console.log('Элемент post добавлен')
    return addedMessage
}

export const hideAddedMessage = (addedMessage) => {
    if (addedMessage) {
        const container = document.querySelector('.container')
        container.removeChild(addedMessage)
        console.log('Элемент post удален')
    }
}
