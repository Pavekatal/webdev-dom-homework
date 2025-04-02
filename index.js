import { getComments } from './modules/getComments.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'
// import { initAddComments } from './modules/initListeners.js'

// document.querySelector('.comments').innerHTML = 'Загрузка...'

export const fetchAndRenderComments = () => {
    getComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchAndRenderComments()
