import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { initAddComments } from './initListeners.js'
import { showLoadingMessage, hideLoadingMessage } from './loadingMessage.js'

export const getComments = () => {
    const loadMessage = showLoadingMessage()
    loadMessage.style.display = 'block'

    return fetch('https://wedev-api.sky.pro/api/v1/Pavekatal/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    'Ошибка при получении комментариев: ' + response.statusText,
                )
            }
            return response.json()
        })
        .then((data) => {
            hideLoadingMessage(loadMessage)
            updateComments(data.comments)
            renderComments()
            initAddComments(renderComments)
        })
        .catch((error) => {
            hideLoadingMessage(loadMessage)
            console.error('Произошла ошибка:', error)
        })
}
