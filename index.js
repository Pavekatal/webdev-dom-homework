import { renderComments } from './modules/renderComments.js'
import { initAddComments } from './modules/initListeners.js'
import { updateComments } from './modules/comments.js'

fetch('https://wedev-api.sky.pro/api/v1/Pavekatal/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        updateComments(data.comments)
        renderComments()
    })

initAddComments(renderComments)
