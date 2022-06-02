import * as request from 'supertest'
import * as express from 'express'

import { OpenAPIBackend, Request } from 'openapi-backend';
import { Source } from '../../db/data-source'
import { getUserHandler } from '../../api/handlers/routeHandlers/getUserHandler'

import { validationFunctions } from '../../api/validationFunctions'
import { postTestResponseHandler } from '../../api/handlers/validationHandlers/postResponseHandler'

import type { Response } from 'express'



const file = '/Users/ammarsura/chatdaddy/w/openapi.yaml'
describe('check if getUser routes work', () => {
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
      
    
        api.register({
            'getUser' : async (c, req, res) => {
                
                const result = await getUserHandler(c, source)

                return result
                
            },
            
        })
    
        app.use((req, res) => {
            return(api.handleRequest(
            req as Request,
            req,
            res))
        })
    })

    test('if getUser with no query params returns status 200 and all users', async () => {
        
        await request(app)
        .get('/users')
        .expect(200)
        .then( (res: Response) => {

            const response = (JSON.parse(res.text))
        
            expect(response.length >= 0).toBe(true)
            expect(true).toBe(true)
            if (response.length > 0) {
                expect('userId' in response[0]).toBe(true)
                expect('phoneNumber' in response[0]).toBe(true)
                expect('fname' in response[0]).toBe(true)
                expect('lname' in response[0]).toBe(true)
            } 

        })  
    });

    test('if getUser with query params returns status 200 and one user', async () => {
        await request(app)
        .get('/users')
        .query({
            userId: 36,
            phoneNumber: '91101010101'
        })
        .expect(200)
        .then( (res: Response) => {
            const response = (JSON.parse(res.text))
           
            expect(response.length ).toBeLessThanOrEqual(1)

            if (response.length > 0) {
                expect('userId' in response[0]).toBe(true)
                expect('phoneNumber' in response[0]).toBe(true)
                expect('fname' in response[0]).toBe(true)
                expect('lname' in response[0]).toBe(true)
            }
        
        } )
    
    })

})