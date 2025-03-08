import { comments } from './comments.js'
import { initLikesComments, initRepliesComments } from './initListeners.js'
import { formatApiDate } from './formattedDate.js'

export const renderComments = () => {
    const otherComments = document.querySelector('.comments')
    const commentsContainer = document.createElement('div')
    commentsContainer.id = 'commentsContainer'
    otherComments.appendChild(commentsContainer)

    commentsContainer.innerHTML = ''

    const commentHTML = comments
        .map((comment, index) => {
            const likeButtonClass = comment.isLiked
                ? 'like-button -active-like'
                : 'like-button'

            const quoteHTML = comment.quote
                ? `<div class="reply">${comment.quote.author}: "${comment.quote.text}"</div> `
                : ''
            const formatingDate = formatApiDate(comment.date)

            return `<li class="comment" data-comment-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${formatingDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${quoteHTML}${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${likeButtonClass}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
        })
        .join('')

    otherComments.innerHTML = commentHTML
    initLikesComments(renderComments)
    initRepliesComments()
}
