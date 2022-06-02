import * as request from 'supertest'
import * as express from 'express'

import { OpenAPIBackend } from 'openapi-backend';
import { Source } from '../../db/data-source'

import { Request } from 'express'

import { validationFunctions } from '../../api/validationFunctions'
import { postTestResponseHandler } from '../../api/handlers/validationHandlers/postResponseHandler'

import { Users } from '../../db/entity/Users.entity'
import { handlerFunctions } from '../../api/handlerFunctions';
const file = '/Users/ammarsura/chatdaddy/w/openapi.yaml'


// const helperServer = async () => {
//     app = express()
//     app.use(express.json())
    
//     const api = new OpenAPIBackend({

//         definition: file,
//         quick: true
        
//     });
//     api.init();
    
//     source = await Source();

//     validationFunctions.forEach((pair) => {
        
//         api.register(pair.key, pair.func)
        
//     })
      
    
//     api.register({
//         'getUser' : async (c, req, res) => {
            
//             const result = await getUserHandler(c, source)

//             return result
//             // console.dir(c.operation)
//             // // res.status(result.statusCode)
//             // res.status(result.statusCode)
//             // res.send(result.body)
//             // res.send({status: result.statusCode, body: JSON.parse(result.body)})
           
            
//         },
//         'postUser' : async (c, req, res) => {
//             const result = await postUserHandler(c, source)

//             return result
            
//                 // res.status(result.statusCode)
//                 // res.send(result.body)
           
            
//         },
//         'patchUser' : async (c, req, res) => {
            
//             const result = await patchUserHandler(c, source)

//             return result
        
//             // res.status(result.statusCode)
//             // res.send(result.body)
            
            
//         },
//         'deleteUser' : async (c, req, res) => {

//             const result = await deleteUserHandler(c, source)

//             return result
               
//         }
//     })
    
//     app.use((req, res) => {
//         return(api.handleRequest(
//         req as Request,
//         req,
//         res))
//     })

//     app.listen(3001, () => {
//         console.log(`Example app listening on port ${3001}`)
//     })
// }

// helperServer();

describe('if routes work fine', () => {

    let source;

   
      
    
    let app;

    afterAll(async () => {
        await source.destroy()
    })
    beforeAll( async () => {
        
        app = express()
        app.use(express.json())
    
        const api = new OpenAPIBackend({

            definition: file,
            quick: true
            
        });
        api.init();
        
        source = await Source();

        validationFunctions.forEach((pair) => {
            if (pair.key !== 'postResponseHandler') {
                api.register(pair.key, pair.func)
            }
            
            
        })

        api.register('postResponseHandler', postTestResponseHandler)
      

        app.use((req, res) => {
            return(api.handleRequest(
            req as Request,
            req,
            res))
        })
      
    })
    

    test('check if wrong path returns 404', async () => {
        await request(app)
            .get('/users/crap')
            .expect(404)
    })

    test('check if wrong method returns 405', async () => {
        await request(app)
        .put('/users')
        .expect(405)
    })

   
})



