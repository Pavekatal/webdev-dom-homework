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
    })
}

export const registration = (login, name, password) => {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({ login: login, name: name, password: password }),
    })
}
