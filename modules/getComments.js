export const getComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/Pavekatal/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    'Ошибка при получении комментариев: ' + response.statusText,
                )
            }
            return response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return appComments
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error)
        })
}
