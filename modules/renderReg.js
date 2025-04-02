import { registration, updateToken, updateName } from './authorization.js'
import { fetchAndRenderComments } from '../index.js'
import { renderLogin } from './renderLogin.js'

export const renderReg = () => {
    const containerComments = document.querySelector('.container')

    const loginHTML = `
    <div class="add-form">
            <h1>Форма регистрации</h1>
             <input type="text" class="add-form-name" placeholder="Введите имя" id="name" required>
            <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required>
            <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required>
            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit" id="reg-button">Зарегистрироваться</button>
                <u class="add-form-button-link entry">Войти</u>
            </fieldset>
        </div>
    `
    containerComments.innerHTML = loginHTML

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const regButton = document.getElementById('reg-button')
    const nameUser = document.getElementById('name')
    const loginUser = document.getElementById('login')
    const passwordUser = document.getElementById('password')

    regButton.addEventListener('click', () => {
        registration(nameUser.value, loginUser.value, passwordUser.value)
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
