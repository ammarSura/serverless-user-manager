import { Source } from '../../../db/data-source'
import { Users } from '../../../db/entity/Users.entity'
import { postUserHandler } from '../../../api/handlers/postUserHandler'
import { APIGatewayProxyEvent, APIGatewayEventClientCertificate, APIGatewayEventRequestContext } from 'aws-lambda'
import { Context } from 'openapi-backend';


let clientCert: APIGatewayEventClientCertificate;
let c: Context;
let context: APIGatewayEventRequestContext;

const event: APIGatewayProxyEvent = {
    
    body: `{
        "phoneNumber": "91001221",
        "fname": "Manu",
        "lname": "Chau"
    }`,
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
    queryStringParameters: {userId: '1', phoneNumber: '9190909090090'},
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


test('return details of created user and compare if returned details match request details and status 200', async () => {
    
    const source = await Source()
    const request = JSON.parse(event.body)
    const result = await postUserHandler(c, event, context, source)
    const resultObj: Users = JSON.parse(result.body)
    const statusCode: number = result.statusCode
    
    const check = () => {
        
        if ('userId' in resultObj && 'fname' in resultObj && 'lname' in resultObj && 'phoneNumber' in resultObj) {
            if (resultObj.fname == request.fname && resultObj.lname == request.lname && resultObj.phoneNumber == resultObj.phoneNumber) {
                return true
            }
        }
        
        return false
    }


    expect(check() && statusCode==200).toBe(true)

})

   

