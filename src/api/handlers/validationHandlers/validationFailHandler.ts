export const validationFailHandler = (c, req, res) => {
    return({
        statusCode: 400,
        body: {
            err: c.validation.errors
        }
    })
}