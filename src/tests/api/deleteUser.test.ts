import * as request from 'supertest'
import * as express from 'express'

import { OpenAPIBackend, Request } from 'openapi-backend';
import { Source } from '../../db/data-source'
import { deleteUserHandler } from '../../api/handlers/routeHandlers/deleteUserHandler'

import { validationFunctions } from '../../api/validationFunctions'
import { postTestResponseHandler } from '../../api/handlers/validationHandlers/postResponseHandler'

import { Users } from '../../db/entity/Users.entity'
import type { Response } from 'express'

import { parseQueryParams } from '../../api/handlers/routeHandlers/deleteUserHandler'
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
            
            'deleteUser' : async (c, req, res) => {

                const result = await deleteUserHandler(c, source)

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

    test('if deleteUser deletes in db', async () => {

        // create dummy users

        const dummies = [
            {
                phoneNumber: '911234567890',
                fname: 'deleteDummy1fname',
                lname: 'deleteDummy1lname',
            },
            {
                phoneNumber: '911234567890',
                fname: 'deleteDummy2fname',
                lname: 'deleteDummy2lname',
            }
        ]

        const results = await source
        .getRepository(Users)
        .save(dummies)
        let userIds = '' 
        for(let i = 0; i < results.length; i++) {
            if (i === 0) {
                userIds = results[i].userId
            } else {
                userIds = `${userIds},${results[i].userId}`
            }
        }
        
        // const userIds = '106'
        await request(app)
            .delete('/users')
            .query({
                userId: results[0].userId,
                phoneNumber: results[0].phoneNumber,
                userIds: userIds
            })
            .expect(200)
            .then( async (res: Response) => {
                
                const check = await source.getRepository(Users).find({
                    where: parseQueryParams(userIds)
                })

                expect(check).toEqual([])
            })

    })

    test.each([
        {
            userId: 110,
            phoneNumber: '911234567890',
        },
        {
            userIds: '110,122',
            phoneNumber: '911234567890',
        },
        {
            userIds: '110,122',
            userId: 110,
        },
        

        ])
      ('if deleteUser bad params %# returns 400', async (row) => {
        await request(app)
        .delete('/users')
            .query(row)
            .expect(400)
        });

    test('if response is correct for valid request', async () => {
        const userIds = '36,37'
        await request(app)
            .delete('/users')
            .query(
                {
                    userId: 36,
                    phoneNumber: '91101010101',
                    userIds: userIds
                }
            )
            .expect(200)
            .then((res: Response) => {
                expect(JSON.parse(res.text).includes(userIds)).toBe(true)
            })
    })

})