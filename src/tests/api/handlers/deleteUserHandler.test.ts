import { deleteUserHandler, parseQueryParams } from '../../../api/handlers/deleteUserHandler'
import { Source } from '../../../db/data-source';
import { APIGatewayProxyEvent, APIGatewayEventClientCertificate, APIGatewayEventRequestContext } from 'aws-lambda'
import { Context } from 'openapi-backend';

let clientCert: APIGatewayEventClientCertificate;
let c: Context;
let context: APIGatewayEventRequestContext;
const event: APIGatewayProxyEvent = {
  body: null,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.29.0',
    Accept: '*/*',
    'Postman-Token': '78f69675-f106-4add-8520-473d4a9e215b',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '91'
  },
  httpMethod: 'DELETE',
  isBase64Encoded: false,
  multiValueHeaders: {
    'Content-Type': [ 'application/json' ],
    'User-Agent': [ 'PostmanRuntime/7.29.0' ],
    Accept: [ '*/*' ],
    'Postman-Token': [ '78f69675-f106-4add-8520-473d4a9e215b' ],
    Host: [ 'localhost:3000' ],
    'Accept-Encoding': [ 'gzip, deflate, br' ],
    Connection: [ 'keep-alive' ],
    'Content-Length': [ '91' ]
  },
  multiValueQueryStringParameters: {
    userId: [ '29' ],
    phoneNumber: [ '918796254321' ],
    userIds: [ '29' ]
  },
  path: '/users',
  pathParameters: { proxy: 'users' },
  queryStringParameters: { userId: '29', phoneNumber: '918796254321', userIds: '29' },
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
    extendedRequestId: 'cl3tna0c80003vfrc2fyj13sd',
    httpMethod: 'DELETE',
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
    requestId: 'cl3tna0c80004vfrcfwmt9pab',
    requestTime: '31/May/2022:09:43:30 +0530',
    requestTimeEpoch: 1653970410291,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/{proxy*}',
    stage: 'dev'
  },
  resource: '/{proxy*}',
  stageVariables: null
}


describe('deleteUserHandler returns status 200', () => {
    let source;
      beforeAll( async () => {
          source = await Source()
      });
    test('should return status 200', async () => {

        const result = await deleteUserHandler(c, source)
    
        expect(result).toStrictEqual({ statusCode: 200 })
    })
    
    test('parses csv params and outputs list of user entities', () => {
        const result = parseQueryParams('1,2,3')
        expect(result)
        .toEqual([ { userId: 1 }, { userId: 2 }, { userId: 3 } ])
      });
})

