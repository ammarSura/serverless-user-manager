import { getUserHandler } from './handlers/routeHandlers/getUserHandler'
import { postUserHandler } from './handlers/routeHandlers/postUserHandler'
import { patchUserHandler } from './handlers/routeHandlers/patchUserHandler'
import { deleteUserHandler } from './handlers/routeHandlers/deleteUserHandler'



export const handlerFunctions = [
    {
        "key": "getUser",
        "func": getUserHandler
    },
    {
        "key": "postUser",
        "func": postUserHandler
    },
    {
        "key": "patchUser",
        "func": patchUserHandler
    },
    {
        "key": "deleteUser",
        "func": deleteUserHandler
    }
]
