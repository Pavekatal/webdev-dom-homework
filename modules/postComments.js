import { getComments } from './getComments.js'
import { token } from './authorization.js'

export const postComments = (name, text, attempt = 1) => {
    const addForm = document.querySelector('.add-form')
    addForm.style.display = 'none'

    const sendComment = () => {
        return fetch('https://wedev-api.sky.pro/api/v2/Pavekatal/comments', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, text, forceError: true }),
        })
    }

    return sendComment()
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Сервер недоступен.')
                }

                if (response.status === 400) {
                    throw new Error('Неверный запрос')
                }

                throw new Error('Что-то пошло не так...')
            }
        })
        .then(() => {
            return getComments()
        })
        .catch((error) => {
            if (error.message === 'Сервер недоступен.' && attempt < 5) {
                // alert(
                //     'Похоже, серевер недоступен, пробуем отправить твой запрос',
                // )
                return postComments(name, text, attempt + 1)
            } else {
                throw error
            }
        })
        .finally(() => {
            document.querySelector('.loading-message').style.display = 'none'
            addForm.style.display = 'flex'
        })
}
