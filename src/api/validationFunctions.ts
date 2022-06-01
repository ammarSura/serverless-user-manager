import { validationFailHandler } from './handlers/validationHandlers/validationFailHandler'
import { notFound } from './handlers/validationHandlers/notFoundHandler'
import { methodNotAllowed } from './handlers/validationHandlers/methodNotFoundHandler'
import { notImplementedHandler } from './handlers/validationHandlers/notImplementedHandler'
import { postResponseHandler } from './handlers/validationHandlers/postResponseHandler'










export const validationFunctions =  [ 
    {
        "key": "validationFail",
        "func": validationFailHandler
    },
    {
        "key": "notFound",
        "func": notFound
    },
    {
        "key": "methodNotAllowed",
        "func": methodNotAllowed
    },
    {
        "key": "notImplemented",
        "func": notImplementedHandler
    },
    {
        "key": "postResponseHandler",
        "func": postResponseHandler
    }
    
]