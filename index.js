import { renderComments } from './modules/renderComments.js'
import { initAddComments } from './modules/initListeners.js'

renderComments()
initAddComments(renderComments)
