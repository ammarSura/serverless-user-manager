export const methodNotAllowed = (c, req, res) => {
    
    return({
        statusCode: 405,
        body: JSON.stringify({
            err: 'Method not allowed'
        })
    })
}
