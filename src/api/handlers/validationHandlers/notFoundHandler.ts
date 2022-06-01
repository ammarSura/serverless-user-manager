export const notFound = (c, req, res) => {
    return({
        statusCode: 404,
        body: JSON.stringify({
            err: 'Not found'
        })
    })
}