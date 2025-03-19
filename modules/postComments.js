import { showAddedMessage, hideAddedMessage } from './loadingMessage.js'

export const postComments = (name, text) => {
    const addForm = document.querySelector('.add-form')
    addForm.style.display = 'none'

    const addedMessage = showAddedMessage()

    return fetch('https://wedev-api.sky.pro/api/v1/Pavekatal/comments', {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.error)
                })
            }
            return response.json()
        })
        .then((result) => {
            hideAddedMessage(addedMessage)
            addForm.style.display = 'flex'
            return result
        })
        .catch((error) => {
            hideAddedMessage(addedMessage)
            addForm.style.display = 'flex'
            console.error('Ошибка при отправке комментария', error)
            throw error
        })
}
