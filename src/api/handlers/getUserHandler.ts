import { Context } from 'openapi-backend';
import { DataSource } from 'typeorm';
import { Users } from '../../db/entity/Users.entity'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const getUserHandler = async (c: Context, event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, source: DataSource) => {

    
    // console.dir(event)
    const queryParams = event.queryStringParameters
    let results;
    
    if (queryParams) {
        results = await source.getRepository(Users).find({
            where: {
                userId: parseInt(queryParams.userId)
            }
        })
    } else {
        results = await source.getRepository(Users).find({})
    }
        
        
    return ({
        statusCode: 200,
        body: JSON.stringify(results),
    })
}