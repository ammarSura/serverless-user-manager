export const postResponseHandler = (c, req, res) => {

    console.dir(c.operation)
    console.dir(c.response)
    console.dir(c)

    if (c.response.statusCode == 200) {
    const valid = c.api.validateResponse(c.response, c.operation);
    if (valid.errors) {
      return({
        statusCode: 502,
        body: JSON.stringify({
            status: 502, 
            err: valid.errors
        })
    })
    }
    return({
        statusCode: 200,
        body: JSON.stringify(c.response)
    })
    } else {
        return (c.response)
    }

}