export const methodNotAllowed = (c, req, res) => {
    
    return({
        statusCode: 405,
        body: {
            err: 'Method not allowed'
        }
    })
}
