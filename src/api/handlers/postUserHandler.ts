import { DataSource } from 'typeorm'
import { Users } from '../../db/entity/Users.entity'
import { Context } from 'openapi-backend';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const postUserHandler = async (c: Context, source: DataSource) => {
    
    console.log('postUser')

    const body = c.request.requestBody
    
    const results = await source
        .getRepository(Users)
        .save({
            ...body
        })

    return ({
        statusCode: 200,
        body: JSON.stringify(results),
    })
}