import { DataSource } from 'typeorm'
import { Users } from '../../db/entity/Users.entity'
import { Context } from 'openapi-backend';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const postUserHandler = async (c: Context, event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, source: DataSource) => {
    
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

    
    
    return ({
        statusCode: 200,
        body: JSON.stringify(results),
    })
}