import { comments } from './comments.js'
import { clearingHtml } from './clearingHtml.js'
import { formattedDate } from './formattedDate.js'
import { postComments } from './postComments.js'

export const initLikesComments = (renderComments) => {
    const likesButtons = document.querySelectorAll('.like-button')
    const likeCountEls = document.querySelectorAll('.likes-counter')

    likesButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const comment = comments[index]
            comment.isLiked = !comment.isLiked
            comment.isLiked ? comment.likes++ : comment.likes--
            likeCountEls[index].textContent = comment.likes

            renderComments()
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
            userTextComment.value = `> ${currentCommentToReply.author.name}: "${currentCommentToReply.text}":\n  `
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
        const cleanedText = clearingHtml(
            userTextComment.value.replace(/^\s*>.*(?:\n|$)/gm, '').trim(),
        )

        const newComment = {
            author: { name: cleanedName },
            date: formattedDate(),
            text: cleanedText,
            likes: 0,
            isLiked: false,
            quote: currentCommentToReply
                ? {
                      author: currentCommentToReply.author.name,
                      text: currentCommentToReply.text,
                  }
                : null,
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
