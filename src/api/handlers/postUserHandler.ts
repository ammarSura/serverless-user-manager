import { Users } from '../../db/entity/Users.entity'

export const postUserHandler = async (c, event, context, source) => {
    
    console.log('postUser')

    const body = JSON.parse(event.body)
    const values = [body.user_id, body.phone_number, body.fname, body.lname]
    const results = await source
        .getRepository(Users)
        .save({
            phoneNumber: body.phoneNumber,
            fname: body.fname,
            lname: body.lname
        })

    console.log(results)
    
    
    return ({
        statusCode: 200,
        body: JSON.stringify(results),
    })
}