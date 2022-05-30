import { Users } from '../../db/entity/Users.entity'
import { DataSource } from 'typeorm';
import { Context } from 'openapi-backend';
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const patchUserHandler = async (c: Context, event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, source: DataSource) => {
    
    console.log('patchUser')

    const users = JSON.parse(event.body)
    console.dir(users)
        
        const results = await source.getRepository(Users).save(users)
        return ({
            statusCode: 200,
            body: JSON.stringify(results),
        })
}