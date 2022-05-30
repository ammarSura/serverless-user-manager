import { Context } from 'openapi-backend';
import { DataSource } from 'typeorm';
import { Users } from '../../db/entity/Users.entity'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


export const getUserHandler = async (c: Context, event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, source: DataSource) => {
    // console.log(typeof(c), 'c')
    // console.dir(c)
    // console.log(typeof(event), 'event')
    // console.dir(event)
    // console.log(typeof(context), 'context')
    // console.dir(context)
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

    console.log(results)
        
        
    return ({
        statusCode: 200,
        body: JSON.stringify({ 
            results: results 
        }),
    })
}