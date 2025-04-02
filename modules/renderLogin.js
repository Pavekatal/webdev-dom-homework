import { login, updateToken, updateName } from './authorization.js'
import { fetchAndRenderComments } from '../index.js'

export const renderLogin = () => {
    const containerComments = document.querySelector('.container')

    const loginHTML = `
    <div class="add-form">
            <h1>Форма авторизации</h1>
            <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required>
            <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required>
            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit" id="auth-button">Войти</button>
                <u class="add-form-button-link registry">Зарегистрироваться</u>
            </fieldset>
        </div>
    `
    containerComments.innerHTML = loginHTML

    const authButton = document.getElementById('auth-button')
    const loginUser = document.getElementById('login')
    const passwordUser = document.getElementById('password')

    authButton.addEventListener('click', () => {
        login(loginUser.value, passwordUser.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateToken(data.user.token)
                updateName(data.user.name)
                fetchAndRenderComments()
            })
    })
}
