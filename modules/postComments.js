import { showAddedMessage, hideAddedMessage } from './loadingMessage.js'

export const postComments = (name, text, attempt = 1, messageShow = false) => {
    const addForm = document.querySelector('.add-form')
    addForm.style.display = 'none'

    let addedMessage
    if (!messageShow) {
        addedMessage = showAddedMessage()
        messageShow = true
    }

    const sendComment = () => {
        return fetch('https://wedev-api.sky.pro/api/v1/Pavekatal/comments', {
            method: 'POST',
            body: JSON.stringify({ name, text, forceError: true }),
        })
    }

    return sendComment()
        .then((response) => {
            const userNameComment = document.querySelector('.add-form-name')
            const userTextComment = document.querySelector('.add-form-text')

            if (response.ok) {
                return response.json()
            } else {
                if (
                    userNameComment.value.length < 3 &&
                    userTextComment.value.length < 3
                ) {
                    userNameComment.classList.add('error')
                    userTextComment.classList.add('error')

                    setTimeout(() => {
                        userNameComment.classList.remove('error')
                        userTextComment.classList.remove('error')
                    }, 3000)

                    throw new Error(
                        'Имя и текст комментария должны содержать хотя бы 3 символа.',
                    )
                }

                if (userNameComment.value.length < 3) {
                    userNameComment.classList.add('error')

                    setTimeout(() => {
                        userNameComment.classList.remove('error')
                    }, 3000)

                    throw new Error('Имя должно содержать хотя бы 3 символа.')
                }

                if (userTextComment.value.length < 3) {
                    userTextComment.classList.add('error')

                    setTimeout(() => {
                        userTextComment.classList.remove('error')
                    }, 3000)

                    throw new Error(
                        'Текст комментария должен содержать хотя бы 3 символа.',
                    )
                }

                if (response.status === 400) {
                    throw new Error('Запрос содержит ошибку')
                }

                if (response.status === 500) {
                    throw new Error('Сервер недоступен.')
                }

                throw new Error('Что-то пошло не так...')
            }
        })
        .then((result) => {
            return result
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                throw new Error(
                    'Отсутвует подключение. Возобновите работу сети и повторите запрос',
                )
            } else if (error.message === 'Сервер недоступен.' && attempt < 5) {
                // alert(
                //     'Похоже, серевер недоступен, пробуем отправить твой запрос',
                // )
                return postComments(name, text, attempt + 1, messageShow)
            } else {
                throw error
            }
        })
        .finally(() => {
            hideAddedMessage(addedMessage)
            addForm.style.display = 'flex'
        })
}
