import { Context } from 'openapi-backend';
import { DataSource } from 'typeorm';
import { Users } from '../../db/entity/Users.entity'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const deleteUserHandler = async (c: Context, event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, source: DataSource) => {
    

    console.log('deleteUser')
    const queryParams = event.queryStringParameters
    const ids = queryParams.userIds.split(',');
    const entitites = [];
    for (let i = 0; i < ids.length; i++) {
        entitites.push({
            userId: ids[i]
        })
    };

    const results = await source.getRepository(Users).remove(entitites)

    return ({
        statusCode: 200,
    })
}