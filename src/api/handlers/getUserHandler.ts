import { Context } from 'openapi-backend';
import { Users } from '../../db/entity/Users.entity'

export const getUserHandler = async (c: Context, event, context, source) => {
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
                userId: queryParams.userId
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