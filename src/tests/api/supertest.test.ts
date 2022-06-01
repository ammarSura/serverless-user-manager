import * as request from 'supertest'
import * as express from 'express'
import {apiHandler} from '../../api/apiHandler'
import { APIGatewayProxyEvent, APIGatewayEventClientCertificate, APIGatewayEventRequestContext } from 'aws-lambda'
import { Context, OpenAPIBackend, OpenAPIValidator, Request } from 'openapi-backend';
import { Source } from '../../db/data-source'
import { getUserHandler } from '../../api/handlers/getUserHandler'
import { deleteUserHandler } from '../../api/handlers/deleteUserHandler'
import { patchUserHandler } from '../../api/handlers/patchUserHandler'
import { postUserHandler } from '../../api/handlers/postUserHandler'
import { Users } from '../../db/entity/Users.entity'
import type { Response } from 'express'
let c: Context;
let context: APIGatewayEventRequestContext;
let clientCert: APIGatewayEventClientCertificate;
const file = '/Users/ammarsura/chatdaddy/w/openapi.yaml'
import { parseQueryParams } from '../../api/handlers/deleteUserHandler'





describe('routest work fine', () => {

    let source;

    afterAll(async () => {
        await source.destroy()
    })
      
    
    let app;
      beforeAll( async () => {
        app = express()
        app.use(express.json())
    
        const api = new OpenAPIBackend({
    
            definition: file,
            quick: true
          
        });
        api.init();
        
        source = await Source();
      
    
        api.register({
            'getUser' : async (c, req, res) => {
                if (c.validation.valid) {
                    const result = await getUserHandler(c, source)
               
                    res.send({status: result.statusCode, body: JSON.parse(result.body)})
                } else {
                    res.status(400)
                    res.send({status: 400})
                }
                
            },
            'postUser' : async (c, req, res) => {
                if (c.validation.valid) {
                    const result = await postUserHandler(c, source)
               
                    res.send({status: result.statusCode, body: JSON.parse(result.body)})
                } else {
                    res.status(400)
                    res.send({status: 400})
                }
                
            },
            'patchUser' : async (c, req, res) => {
                
                if (c.validation.valid) {
                    const result = await patchUserHandler(c, source)
               
                    res.send({status: result.statusCode, body: JSON.parse(result.body)})
                } else {
                    res.status(400)
                    res.send({status: 400})
                }
                
            },
            'deleteUser' : async (c, req, res) => {
                if (c.validation.valid) {

                    const result = await deleteUserHandler(c, source)
               
                    res.send({status: result.statusCode, body: JSON.parse(result.body)})
                } else {
                    res.status(400)
                    res.send({status: 400})
                }
                
            }
        })
        
        app.use((req, res) => {
            return(api.handleRequest(
            req as Request,
            req,
            res))
        })
    });

   
    test('if getUser with no query params returns status 200 and all users', async () => {
        
        await request(app)
        .get('/users')
        .expect(200)
        .then( (res: Response) => {
            const response = (JSON.parse(res.text)).body
        
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
            const response = (JSON.parse(res.text)).body
           
            expect(response.length ).toBeLessThanOrEqual(1)

            if (response.length > 0) {
                expect('userId' in response[0]).toBe(true)
                expect('phoneNumber' in response[0]).toBe(true)
                expect('fname' in response[0]).toBe(true)
                expect('lname' in response[0]).toBe(true)
            }
        
        } )
    
    })

    test('if postUser creates a user given correct body', async () => {

        const requestBody = {
            phoneNumber: "911234567890",
            fname: "a",
            lname: "b"
        }
        await request(app)
            .post('/users')
            .send({...requestBody})
            .expect(200)
            .then((res: Response) => {
                const response = (JSON.parse(res.text)).body
                expect(response.fname).toEqual(requestBody.fname)
                expect(response.lname).toEqual(requestBody.lname)
                expect(response.phoneNumber).toEqual(requestBody.phoneNumber)
            }) 
    })

    test('if deleteUser if user is deleted in db', async () => {
        
        const userIds = '106'
        await request(app)
            .delete('/users')
            .query({
                userId: 36,
                phoneNumber: '91101010101',
                userIds: userIds
            })
            .expect(200)
            .then( async (res: Response) => {
                const response = (JSON.parse(res.text)).requestBody
                
                const check = await source.getRepository(Users).find({
                    where: parseQueryParams(userIds)
                })

                expect(check).toEqual([])
            })
    })

    test('if patchUser returns array of updated users with ids unchanged', async () => {

        const requestBody = [
                {
                    userId: 107,
                    phoneNumber: "911234567890",
                    fname: "a",
                    lname: "b"
                },
                {
                    userId: 108,
                    phoneNumber: "911234567890",
                    fname: "a",
                    lname: "b"
                },
                {
                    userId: 109,
                    phoneNumber: "911234567890",
                    fname: "a",
                    lname: "b"
                },
        ]
        await request(app)
            .patch('/users')
            .query({
                userId: 36,
                phoneNumber: '91101010101',
            })
            .send(requestBody)
            .expect(200)
            .then(async (res: Response) => {
                let userIds = []
                requestBody.forEach(element => {
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
                expect(check.length).toEqual(requestBody.length)
                for(let i = 0; i < check.length; i++) {
                    expect(check[i]).toEqual(requestBody[i])
                }
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
        {
            userIds: '110,122',
            phoneNumber: '911234567890',
            userId: '110'
        },
        {
            userIds: '110, 122',
            phoneNumber: '911234567890',
            userId: 110
        },
        {
            userIds: '110,122',
            phoneNumber: 911234567890,
            userId: 110
        },

        ])
      ('if deleteUser bad params %# returns 400', async (row) => {
        await request(app)
        .delete('/users')
            .query(row)
            .expect(400)
      });

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
          console.log(row)
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



