import { Context } from 'openapi-backend';
import { DataSource } from 'typeorm';
import { Users } from '../../db/entity/Users.entity'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'


const parseQueryParams = (userIds: String) => {
    const ids = userIds.split(',');
    const output = [];
    for (let i = 0; i < ids.length; i++) {
        output.push({
            userId: parseInt(ids[i])
        })
    }

    return output;
};

const deleteUserHandler = async (c: Context, event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, source: DataSource) => {

    
    const entitites = parseQueryParams(event.queryStringParameters.userIds)

    await source.getRepository(Users).remove(entitites)

    return ({
        statusCode: 200,
    })
}

export {deleteUserHandler, parseQueryParams}