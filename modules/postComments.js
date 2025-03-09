export const postComments = async (name, text) => {
    const response = await fetch(
        'https://wedev-api.sky.pro/api/v1/Pavekatal/comments',
        {
            method: 'POST',
            body: JSON.stringify({ name, text }),
        },
    )

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
    }

    const result = await response.json()
    return result
}
