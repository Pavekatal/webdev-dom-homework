import { getComments } from './modules/getComments.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'
import { initAddComments } from './modules/initListeners.js'

document.querySelector('.comments').innerHTML = 'Загрузка...'

getComments().then((data) => {
    updateComments(data)
    renderComments()
})

initAddComments(renderComments)
