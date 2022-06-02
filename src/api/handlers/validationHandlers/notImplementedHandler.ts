export const notImplementedHandler = (c, req, res) => {
    return({
        statusCode: 501,
        body: {
            err: 'No handler registered for operation'
        }
    })

}