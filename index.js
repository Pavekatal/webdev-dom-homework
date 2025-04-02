import { getComments } from './modules/getComments.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'

export const fetchAndRenderComments = (isFirstLoad) => {
    if (isFirstLoad) {
        document.querySelector('.container').innerHTML =
            `<div>Загрузка комментариев...</div>`
    }

    getComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchAndRenderComments(true)
