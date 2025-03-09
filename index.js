import { renderComments } from './modules/renderComments.js'
import { initAddComments } from './modules/initListeners.js'
import { getComments } from './modules/getComments.js'

getComments()
renderComments()
initAddComments(renderComments)
