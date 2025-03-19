import { comments } from './comments.js'
import { clearingHtml } from './clearingHtml.js'
import { postComments } from './postComments.js'
import { delay } from './delay.js'

export const initLikesComments = (renderComments) => {
    const likesButtons = document.querySelectorAll('.like-button')
    const likeCountEls = document.querySelectorAll('.likes-counter')

    likesButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const comment = comments[index]

            likeButton.classList.add('-loading-like')

            delay(2000).then(() => {
                comment.isLiked = !comment.isLiked
                comment.isLiked ? comment.likes++ : comment.likes--
                likeCountEls[index].textContent = comment.likes

                likeButton.classList.remove('-loading-like')

                renderComments()
            })
        })
    })
}
let currentCommentToReply = null
export const initRepliesComments = () => {
    const userTextComment = document.querySelector('.add-form-text')
    const repliesComments = document.querySelectorAll('.comment')

    for (const replyComment of repliesComments) {
        replyComment.addEventListener('click', () => {
            const indexComment = +replyComment.dataset.commentIndex
            currentCommentToReply = comments[indexComment]

            const author = currentCommentToReply.author || ''
            const text = currentCommentToReply.text || ''

            userTextComment.value = `<QUOTE>${clearingHtml(author)}: "${clearingHtml(text)}"</QUOTE>\n`
            userTextComment.focus()
        })
    }
}

export const initAddComments = (renderComments) => {
    const userButtonComment = document.querySelector('.add-form-button')
    const userNameComment = document.querySelector('.add-form-name')
    const userTextComment = document.querySelector('.add-form-text')

    userButtonComment.addEventListener('click', async () => {
        userNameComment.classList.remove('error')
        userTextComment.classList.remove('error')

        if (userNameComment.value === '' && userTextComment.value === '') {
            userNameComment.classList.add('error')
            userTextComment.classList.add('error')
            return
        }
        if (userNameComment.value === '') {
            userNameComment.classList.add('error')
            return
        } else {
            userNameComment.classList.remove('error')
        }
        if (userTextComment.value === '') {
            userTextComment.classList.add('error')
            return
        } else {
            userTextComment.classList.remove('error')
        }

        const cleanedName = clearingHtml(userNameComment.value)
        const cleanedText = clearingHtml(userTextComment.value)

        const newComment = {
            author: { name: cleanedName },
            date: Date.now(),
            text: cleanedText,
            likes: 0,
            isLiked: false,
        }

        try {
            await postComments(cleanedName, cleanedText)
            comments.push(newComment)
            renderComments()
        } catch (error) {
            alert(error.message)
        }

        userNameComment.value = ''
        userTextComment.value = ''
        currentCommentToReply = null
    })
}
