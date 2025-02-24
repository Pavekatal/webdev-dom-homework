export const formattedDate = () => {
    const currentDate = new Date()
    const optionDate = { day: 'numeric', month: 'numeric' }
    const fullYear = currentDate.getFullYear()
    const lastTwoDigitsYear = fullYear % 100
    const optionTime = { hour: '2-digit', minute: '2-digit' }
    const userDate =
        currentDate.toLocaleDateString('ru-RU', optionDate) +
        `.${lastTwoDigitsYear}`
    const userTime = currentDate.toLocaleTimeString('ru-RU', optionTime)
    const useringDate = `${userDate} ${userTime}`

    return useringDate
}
