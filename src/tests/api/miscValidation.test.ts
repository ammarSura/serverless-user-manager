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



