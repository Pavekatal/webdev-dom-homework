import { comments } from './comments.js'
import { initLikesComments, initRepliesComments } from './initListeners.js'
import { formattedDate } from './formattedDate.js'

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

            const formattedText = comment.text.replace(
                /<QUOTE>(.*?)<\/QUOTE>/g,
                (match, p1) => {
                    return `<div class="reply">${p1}</div>`
                },
            )
            const formatingDate = formattedDate(new Date(comment.date))

            return `<li class="comment" data-comment-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${formatingDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${formattedText}</div>
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
