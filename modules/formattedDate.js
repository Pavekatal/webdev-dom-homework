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

export const formatApiDate = (dateString) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}
