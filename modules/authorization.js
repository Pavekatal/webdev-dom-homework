const authToken = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const updateToken = (newToken) => {
    token = newToken
}

export let userName = ''

export const updateName = (newName) => {
    userName = newName
}

export const login = (login, password) => {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            if (response.status === 400) {
                throw new Error('Неверный логин или пароль')
            }

            throw new Error('Что-то пошло не так...')
        }
    })
}

export const registration = (name, login, password) => {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            if (response.status === 400) {
                throw new Error('Пользователь с таким логином уже существует')
            }

            throw new Error('Что-то пошло не так...')
        }
    })
}
