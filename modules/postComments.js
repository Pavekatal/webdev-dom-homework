// export const postComments = async (name, text) => {
//     const response = await fetch(
//         'https://wedev-api.sky.pro/api/v1/Pavekatal/comments',
//         {
//             method: 'POST',
//             body: JSON.stringify({ name, text }),
//         },
//     )

//     if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error)
//     }

//     const result = await response.json()
//     return result
// }

export const postComments = (name, text) => {
    return fetch('https://wedev-api.sky.pro/api/v1/Pavekatal/comments', {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.error)
                })
            }
            return response.json()
        })
        .then((result) => {
            return result
        })
        .catch((error) => {
            console.error('Ошибка при отправке комментария', error)
            throw error
        })
}
