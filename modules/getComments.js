import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'
import { initAddComments } from './initListeners.js'

export const getComments = async () => {
    try {
        const response = await fetch(
            'https://wedev-api.sky.pro/api/v1/Pavekatal/comments',
        )

        if (!response.ok) {
            throw new Error(
                'Ошибка при получении комментариев: ' + response.statusText,
            )
        }

        const data = await response.json()
        updateComments(data.comments)
        renderComments()
        initAddComments(renderComments)
    } catch (error) {
        console.error('Произошла ошибка:', error)
    }
}
