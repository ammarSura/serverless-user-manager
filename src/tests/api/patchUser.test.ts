import * as request from 'supertest'
import * as express from 'express'

import { OpenAPIBackend, Request } from 'openapi-backend';
import { Source } from '../../db/data-source'
import { patchUserHandler } from '../../api/handlers/routeHandlers/patchUserHandler'

import { validationFunctions } from '../../api/validationFunctions'
import { postTestResponseHandler } from '../../api/handlers/validationHandlers/postResponseHandler'

import { Users } from '../../db/entity/Users.entity'
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
            
            'patchUser' : async (c, req, res) => {
                
                const result = await patchUserHandler(c, source)

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

    test('if patchUser returns array of updated users with ids unchanged if all entities are in db', async () => {

        // create dummy users

        const dummies = [
            {
                phoneNumber: '911234567890',
                fname: 'patchDummy1fname',
                lname: 'patchDummy1lname',
            },
            {
                phoneNumber: '911234567890',
                fname: 'patchDummy2fname',
                lname: 'patchDummy2lname',
            }
        ]

        const results = await source
        .getRepository(Users)
        .save(dummies)

        results.forEach(el => {
            results.fname = `patched${results.fname}`
        });

        
        await request(app)
            .patch('/users')
            .query({
                userId: results[0].userId,
                phoneNumber: results[0].phoneNumber,
            })
            .send(results)
            .expect(200)
            .then(async (res: Response) => {
                let userIds = []
                results.forEach(element => {
                    userIds.push({
                        userId: element.userId
                    })
                });
                const check = await source.getRepository(Users).find({
                    where: userIds,
                    select: {
                        fname: true,
                        lname: true,
                        userId: true,
                        phoneNumber: true
                    },
                })
                expect(check.length).toEqual(results.length)
                for(let i = 0; i < check.length; i++) {
                    expect(check[i]).toEqual(results[i])
                }

                await source.getRepository(Users).remove(userIds)
            })

            
    })

    test.each([
        null,
        [null],
        [
            {
                userId: 1
            },
            {
                userId: 2,
                phoneNumber: '123',
                lname: 'a',
                fname: 'b'
            
            }
        ],
        [
            {
                phoneNumber: '123'
            },
        ],
        [
            {
                userId: 1,
                phoneNumber: '123',
                lname: 'a'
            }
        ],
        [
            {
                userId: 1,
                phoneNumber: 123,
                lname: 'a',
                fname: 'b'
            }
        ],
        
    
      ]
        
        )
      ('if patchUser with bad req body %# returns 400', async (...row) => {
          await request(app)
          .patch('/users')
          .query({
              userId: 1,
              phoneNumber: '123'
          })
          .send(row[0])
          .expect(400)
      })
    

})