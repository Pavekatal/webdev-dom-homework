import { comments } from './comments.js'
import {
    initLikesComments,
    initRepliesComments,
    initAddComments,
} from './initListeners.js'
import { formattedDate } from './formattedDate.js'
import { renderLogin } from './renderLogin.js'
import { token, userName } from './authorization.js'

export const renderComments = () => {
    // const otherComments = document.querySelector('.comments')
    // const commentsContainer = document.createElement('div')
    // commentsContainer.id = 'commentsContainer'
    // otherComments.appendChild(commentsContainer)

    // commentsContainer.innerHTML = ''

    const containerComments = document.querySelector('.container')

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

    const addFormCommentsHTML = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя" readonly value="${userName}"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="loading-message" style="display: none">
                Добавление комментария...
            </div>`

    const authMessage = `<div class="auth-message">Чтобы отправить комментарий, необходимо <u class="auth-link">войти</u></div>`

    const startHTML = `
    <ul class="comments">${commentHTML}</ul>
    ${token ? addFormCommentsHTML : authMessage}
    `
    containerComments.innerHTML = startHTML

    if (token) {
        initLikesComments(renderComments)
        initRepliesComments()
        initAddComments(renderComments)
    } else {
        document.querySelector('.auth-link').addEventListener('click', () => {
            renderLogin()
        })
    }

    // otherComments.innerHTML = commentHTML
}
