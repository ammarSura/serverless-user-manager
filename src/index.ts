import { apiHandler } from './api/apiHandler'
import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) => {
    return (
        apiHandler(event, context)
    )
}
