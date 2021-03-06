import * as request from 'supertest'
import * as express from 'express'

import { OpenAPIBackend, Request } from 'openapi-backend';
import { Source } from '../../db/data-source'
import { Users } from "../../db/entity/Users.entity";
import { postUserHandler } from '../../api/handlers/routeHandlers/postUserHandler'

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
            
            'postUser' : async (c, req, res) => {
                const result = await postUserHandler(c, source)

                return result
                
                    // res.status(result.statusCode)
                    // res.send(result.body)
            
                
            },
        
        })
    
        app.use((req, res) => {
            return(api.handleRequest(
            req as Request,
            req,
            res))
        })
    })

    test('if postUser creates a user given correct body', async () => {
        const dummy = {
            phoneNumber: '911234567890',
            fname: 'postDummy1fname',
            lname: 'postDummy1lname',
        }

       
        await request(app)
            .post('/users')
            .send({...dummy})
            .expect(200)
            .then( async (res: Response) => {
                const response = (JSON.parse(res.text))
                expect(response.fname).toEqual(dummy.fname)
                expect(response.lname).toEqual(dummy.lname)
                expect(response.phoneNumber).toEqual(dummy.phoneNumber)

                await source.getRepository(Users).remove({userId: response.userId})
            }) 
        
    })

    test.each([
        null,
        {

        },
        {
            fname: 'a',
            lname: 'b'
        },
        {
            fname: 'a',
            phoneNumber: '121'
        },
        {
            lname: 'a',
            phoneNumber: '1'
        }
    ])
    ('if postUser with bad req body %# returns 400', async (row) => {
      await request(app)
      .post('/users')
      .send(row)
      .expect(400)
    })

})