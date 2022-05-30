import OpenAPIBackend, { Context, Request } from 'openapi-backend' 
import { getUserHandler } from './handlers/getUserHandler'
import { postUserHandler } from './handlers/postUserHandler'
import { patchUserHandler } from './handlers/patchUserHandler'
import { deleteUserHandler } from './handlers/deleteUserHandler'
import { Source } from '../db/data-source'
 
export const apiHandler = async (event, context) => {
    
    const api = new OpenAPIBackend({

        definition: './openapi.yaml',
        quick: true
      
    });

    const source = await Source();
    

    api.register({
        'getUser' : (c, context, event) => {
            return (getUserHandler(c, context, event, source))
        },
        'postUser' : (c, context, event) => {
            return (postUserHandler(c, context, event, source))
        },
        'patchUser' : (c, context, event) => {
            return (patchUserHandler(c, context, event, source))
        },
        'deleteUser' : (c, context, event) => {
            return (deleteUserHandler(c, context, event, source))
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