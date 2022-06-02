
export const postResponseHandler = (c, req, res) => {
    console.log("asdasdasdasd")
    if (c.response.statusCode == 200) {
        const valid = c.api.validateResponse(c.response.body, c.operation);
        console.log(valid)
        if (!valid.valid) {
            

            return({
                    statusCode: 502,
                    body: JSON.stringify({
                        status: 502, 
                        err: valid.errors
                    })
            })
        }
    }     
  
    
    return({
        statusCode: c.response.statusCode,
        body: JSON.stringify(c.response.body)
    })
    
  
    

}

export const postTestResponseHandler = (c, req, res) => {
    console.log("asdasdasdasd")
    if (c.response.statusCode == 200) {
        const valid = c.api.validateResponse(c.response.body, c.operation);
        console.log(valid)
        if (!valid.valid) {
            res.status(502)
            res.send(
                JSON.stringify({
                    err: valid.errors
                })
            )

            return({
                    statusCode: 502,
                    body: JSON.stringify({
                        status: 502, 
                        err: valid.errors
                    })
            })
        }
    }     
    res.status(c.response.statusCode)
    res.send(JSON.stringify(c.response.body))
    
    // return({
    //     statusCode: c.response.statusCode,
    //     body: JSON.stringify(c.response.body)
    // })
    
  
    

}