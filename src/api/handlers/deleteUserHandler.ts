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

const deleteUserHandler = async (c: Context, source: DataSource) => {

    console.log('deleteUser')

    if (c.validation.valid) {

        const queryParams = c.request.query
        const entitites = parseQueryParams(queryParams.userIds as string)

        await source.getRepository(Users).remove(entitites)
        

        return ({
            statusCode: 200,
            body: JSON.stringify({
                work: "work"
            })
        })
  
    } else {
        return ({
            statusCode: 400,
            body: JSON.stringify({
                errorMessage: "Invalid request"
            })
        })
    }
    
}

export {deleteUserHandler, parseQueryParams}