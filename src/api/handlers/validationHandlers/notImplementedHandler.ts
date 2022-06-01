export const notImplementedHandler = (c, req, res) => {
    return({
        statusCode: 501,
        body: JSON.stringify({
            err: 'No handler registered for operation'
        })
    })

}