import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { initAddComments } from './initListeners.js'

export const getComments = () => {
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
            updateComments(data.comments)
            renderComments()
            initAddComments(renderComments)
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error)
        })
}
