import { Users } from '../../db/entity/Users.entity'
import { DataSource } from 'typeorm';
import { Context } from 'openapi-backend';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const patchUserHandler = async (c: Context, source: DataSource) => {
    
    console.log('patchUser')

    const users = c.request.requestBody
        
        const results = await source.getRepository(Users).save(users)
        return ({
            statusCode: 200,
            body: JSON.stringify(results)
        })
}