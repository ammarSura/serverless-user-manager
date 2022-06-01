import OpenAPIBackend, { Context, Request } from 'openapi-backend' 
import { getUserHandler } from './handlers/getUserHandler'
import { postUserHandler } from './handlers/postUserHandler'
import { patchUserHandler } from './handlers/patchUserHandler'
import { deleteUserHandler } from './handlers/deleteUserHandler'
import { Source } from '../db/data-source'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'
 
export const apiHandler = async (event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, file: string) => {
    
    const api = new OpenAPIBackend({

        definition: file,
        quick: true
      
    });

    const source = await Source();
    

    api.register({
        'getUser' : (c, context, event) => {
            return (getUserHandler(c, source))
        },
        'postUser' : (c, context, event) => {
            return (postUserHandler(c, source))
        },
        'patchUser' : (c, context, event) => {
            return (patchUserHandler(c, source))
        },
        'deleteUser' : (c, context, event) => {
            return (deleteUserHandler(c, source))
        }
    })


    return api.handleRequest(
        {
            method: event.httpMethod,
            path: event.path,
            query: event.queryStringParameters,
            body: event.body,
            headers: event.headers,
        },
        event,
        context
    );
}