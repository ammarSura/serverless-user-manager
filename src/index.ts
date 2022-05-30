import { Request } from 'openapi-backend'
import { Context } from 'vm'
import { apiHandler } from './api/apiHandler'
\
export const handler = async (event: Request, context: Context) => {
    console.dir(event)
    console.dir(context)
    return (
        apiHandler(event, context)
    )
}
