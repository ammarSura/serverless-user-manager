// import { apiHandler } from '../../api/apiHandler'
// import { Source } from '../../db/data-source'
// import { Users } from '../../db/entity/Users.entity'
// import { APIGatewayProxyEvent, APIGatewayEventClientCertificate, APIGatewayEventRequestContext } from 'aws-lambda'
// import { Context, OpenAPIBackend, OpenAPIValidator } from 'openapi-backend';
// import { Request } from 'openapi-backend';
// import * as path from 'path'



// // const check = () => {
// //     if ( 
// //         event1.httpMethod === 'GET' && 
// //         event1.path === '/users' && 
// //         event1.queryStringParameters === null && 
// //         event1.pathParameters.proxy ==='users') {
      
// //             return true
// //     } 
// //     return false
// // }

// // const check1 = () => {
// //     if ( 
// //         event2.httpMethod === 'GET' && 
// //         event2.path === '/users' && 
// //         event2.queryStringParameters !== null && 
// //         event2.pathParameters.proxy ==='users') {
// //             console.log(event2.queryStringParameters)
// //             if ('userId' in event2.queryStringParameters && 'phoneNumber' in event2.queryStringParameters) {
// //                 return true
// //             }    
// //     } 
// //     return false
// // }

// // const check = () => {
// //     if ( 
// //         event2.httpMethod === 'GET' && 
// //         event2.path === '/users' && 
// //         event2.queryStringParameters !== null && 
// //         event2.pathParameters.proxy ==='users') {
// //             console.log(event2.queryStringParameters)
// //             if ('userId' in event2.queryStringParameters && 'phoneNumber' in event2.queryStringParameters) {
// //                 return true
// //             }    
// //     } 
// //     return false
// // }
let c: Context;
let context: APIGatewayEventRequestContext;
let clientCert: APIGatewayEventClientCertificate;


// // getRequest for all users : correct
const event1: APIGatewayProxyEvent = {
    
    body: null,
    headers: {
        'User-Agent': 'PostmanRuntime/7.29.0',
        Accept: '*/*',
        'Postman-Token': '54e45c5e-5e81-4354-be19-e8937342598a',
        Host: 'localhost:3000',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
    },
    httpMethod: 'GET',
    isBase64Encoded: false,
    multiValueHeaders: {
        'User-Agent': [ 'PostmanRuntime/7.29.0' ],
        Accept: [ '*/*' ],
        'Postman-Token': [ '54e45c5e-5e81-4354-be19-e8937342598a' ],
        Host: [ 'localhost:3000' ],
        'Accept-Encoding': [ 'gzip, deflate, br' ],
        Connection: [ 'keep-alive' ]
    },
    multiValueQueryStringParameters: null,
    path: '/users',
    pathParameters: { proxy: 'users' },
    queryStringParameters: null,
    requestContext: {
        accountId: 'offlineContext_accountId',
        apiId: 'offlineContext_apiId',
        authorizer: {
        claims: undefined,
        scopes: undefined,
        principalId: 'offlineContext_authorizer_principalId'
        },
        domainName: 'offlineContext_domainName',
        domainPrefix: 'offlineContext_domainPrefix',
        extendedRequestId: 'cl3tt75jz0000jprc1it545dn',
        httpMethod: 'GET',
        identity: {
        accessKey: null,
        accountId: 'offlineContext_accountId',
        apiKey: 'offlineContext_apiKey',
        apiKeyId: 'offlineContext_apiKeyId',
        caller: 'offlineContext_caller',
        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
        cognitoIdentityId: 'offlineContext_cognitoIdentityId',
        cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
        principalOrgId: null,
        sourceIp: '127.0.0.1',
        user: 'offlineContext_user',
        userAgent: 'PostmanRuntime/7.29.0',
        userArn: 'offlineContext_userArn',
        clientCert: clientCert
        },
        
        path: '/users',
        protocol: 'HTTP/1.1',
        requestId: 'cl3tt75jz0001jprc7gnr9sr4',
        requestTime: '31/May/2022:12:29:14 +0530',
        requestTimeEpoch: 1653980354771,
        resourceId: 'offlineContext_resourceId',
        resourcePath: '/dev/{proxy*}',
        stage: 'dev'
    },
    resource: '/{proxy*}',
    stageVariables: null
      
}

// // getRequest for one user : correct
// const event2: APIGatewayProxyEvent = {
    
//     body: null,
//     headers: {
//         'User-Agent': 'PostmanRuntime/7.29.0',
//         Accept: '*/*',
//         'Postman-Token': '54e45c5e-5e81-4354-be19-e8937342598a',
//         Host: 'localhost:3000',
//         'Accept-Encoding': 'gzip, deflate, br',
//         Connection: 'keep-alive'
//     },
//     httpMethod: 'GET',
//     isBase64Encoded: false,
//     multiValueHeaders: {
//         'User-Agent': [ 'PostmanRuntime/7.29.0' ],
//         Accept: [ '*/*' ],
//         'Postman-Token': [ '54e45c5e-5e81-4354-be19-e8937342598a' ],
//         Host: [ 'localhost:3000' ],
//         'Accept-Encoding': [ 'gzip, deflate, br' ],
//         Connection: [ 'keep-alive' ]
//     },
//     multiValueQueryStringParameters: null,
//     path: '/users',
//     pathParameters: { proxy: 'users' },
//     queryStringParameters: {userId: '1', phoneNumber: '9190909090090'},
//     requestContext: {
//         accountId: 'offlineContext_accountId',
//         apiId: 'offlineContext_apiId',
//         authorizer: {
//         claims: undefined,
//         scopes: undefined,
//         principalId: 'offlineContext_authorizer_principalId'
//         },
//         domainName: 'offlineContext_domainName',
//         domainPrefix: 'offlineContext_domainPrefix',
//         extendedRequestId: 'cl3tt75jz0000jprc1it545dn',
//         httpMethod: 'GET',
//         identity: {
//         accessKey: null,
//         accountId: 'offlineContext_accountId',
//         apiKey: 'offlineContext_apiKey',
//         apiKeyId: 'offlineContext_apiKeyId',
//         caller: 'offlineContext_caller',
//         cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
//         cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
//         cognitoIdentityId: 'offlineContext_cognitoIdentityId',
//         cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
//         principalOrgId: null,
//         sourceIp: '127.0.0.1',
//         user: 'offlineContext_user',
//         userAgent: 'PostmanRuntime/7.29.0',
//         userArn: 'offlineContext_userArn',
//         clientCert: clientCert
//         },
        
//         path: '/users',
//         protocol: 'HTTP/1.1',
//         requestId: 'cl3tt75jz0001jprc7gnr9sr4',
//         requestTime: '31/May/2022:12:29:14 +0530',
//         requestTimeEpoch: 1653980354771,
//         resourceId: 'offlineContext_resourceId',
//         resourcePath: '/dev/{proxy*}',
//         stage: 'dev'
//     },
//     resource: '/{proxy*}',
//     stageVariables: null
      
// }

// //wrong path
// const event3: APIGatewayProxyEvent = {
    
//     body: null,
//     headers: {
//         'User-Agent': 'PostmanRuntime/7.29.0',
//         Accept: '*/*',
//         'Postman-Token': '54e45c5e-5e81-4354-be19-e8937342598a',
//         Host: 'localhost:3000',
//         'Accept-Encoding': 'gzip, deflate, br',
//         Connection: 'keep-alive'
//     },
//     httpMethod: 'GET',
//     isBase64Encoded: false,
//     multiValueHeaders: {
//         'User-Agent': [ 'PostmanRuntime/7.29.0' ],
//         Accept: [ '*/*' ],
//         'Postman-Token': [ '54e45c5e-5e81-4354-be19-e8937342598a' ],
//         Host: [ 'localhost:3000' ],
//         'Accept-Encoding': [ 'gzip, deflate, br' ],
//         Connection: [ 'keep-alive' ]
//     },
//     multiValueQueryStringParameters: null,
//     path: '/users/crap',
//     pathParameters: { proxy: 'users' },
//     queryStringParameters: {userId: '1', phoneNumber: '9190909090090'},
//     requestContext: {
//         accountId: 'offlineContext_accountId',
//         apiId: 'offlineContext_apiId',
//         authorizer: {
//         claims: undefined,
//         scopes: undefined,
//         principalId: 'offlineContext_authorizer_principalId'
//         },
//         domainName: 'offlineContext_domainName',
//         domainPrefix: 'offlineContext_domainPrefix',
//         extendedRequestId: 'cl3tt75jz0000jprc1it545dn',
//         httpMethod: 'GET',
//         identity: {
//         accessKey: null,
//         accountId: 'offlineContext_accountId',
//         apiKey: 'offlineContext_apiKey',
//         apiKeyId: 'offlineContext_apiKeyId',
//         caller: 'offlineContext_caller',
//         cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
//         cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
//         cognitoIdentityId: 'offlineContext_cognitoIdentityId',
//         cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
//         principalOrgId: null,
//         sourceIp: '127.0.0.1',
//         user: 'offlineContext_user',
//         userAgent: 'PostmanRuntime/7.29.0',
//         userArn: 'offlineContext_userArn',
//         clientCert: clientCert
//         },
        
//         path: '/users',
//         protocol: 'HTTP/1.1',
//         requestId: 'cl3tt75jz0001jprc7gnr9sr4',
//         requestTime: '31/May/2022:12:29:14 +0530',
//         requestTimeEpoch: 1653980354771,
//         resourceId: 'offlineContext_resourceId',
//         resourcePath: '/dev/{proxy*}',
//         stage: 'dev'
//     },
//     resource: '/{proxy*}',
//     stageVariables: null
      
// }

// // const file = path.join(__dirname.cwd(), '/src/openapi.yaml')
// console.log( path.dirname(require.main.filename))

// describe('Checks if request validation is correct by apiHandler function', () => {

//     test('check if it allows a valid get request for all users information', async () => {

//         const result = await apiHandler(event1, context, file)
//         expect(result.statusCode).toBe(200)
        
//     })

//     test('check if it allows a valid get request for one user\'s information', async () => {
//         const result = await apiHandler(event1, context, file)
//         expect(result.statusCode).toBe(200)
//     })

//     test('check if it does not allow a valid get request for one user\'s information', async () => {
//         let error;
//         try {
//             const a = await apiHandler(event3, context, file)
//         } catch (e) {
//             console.log(e.message.slice(0, 3))
//         }

//     })
// })





// // // const foo = async () => {

// // //     try {
// // //     const a = await apiHandler(event1, context, file)
// //     } catch (e) {
// //         console.log('asdasd')
// //         console.dir(Object.getOwnPropertyNames(e))
// //         console.log(e.message)
// //     }
    
// // }

// // foo()


// // console.log(api)

// // console.log(api.validator.validateRequest({
// //     method: event1.httpMethod,
// //     path: event1.path,
// //     query: event1.queryStringParameters,
// //     body: event1.body,
// //     headers: event1.headers,
// // },))