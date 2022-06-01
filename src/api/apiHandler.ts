import OpenAPIBackend, { Context, Request } from 'openapi-backend' 

import { Source } from '../db/data-source'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'
// import typeOperationHandler from "../../node_modules/openapi-backend" 
import { handlerFunctions } from './handlerFunctions'
import { validationFunctions } from './validationFunctions'

export const apiHandler = async (event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, file: string) => {
    
    const api = new OpenAPIBackend({

        definition: file,
        quick: true
      
    });

    const source = await Source();
    
    
    

    handlerFunctions.forEach((pair) => {
        api.register(
            
            pair.key,  (c, context, event) => {
                return (pair.func(c, source))
            }
        )
    });

    validationFunctions.forEach((pair) => {
        api.register( pair.key, pair.func )
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