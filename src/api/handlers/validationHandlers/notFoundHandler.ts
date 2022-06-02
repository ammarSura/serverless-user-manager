export const notFound = (c, req, res) => {
    return({
        statusCode: 404,
        body: {
            err: 'Not found'
        }
    })
}