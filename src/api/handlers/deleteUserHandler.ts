import { Users } from '../../db/entity/Users.entity'

export const deleteUserHandler = async (c, event, context, source) => {
    

    console.log('deleteUser')
    const queryParams = event.queryStringParameters
    const ids = queryParams.userIds.split(',');
    const entitites = [];
    for (let i = 0; i < ids.length; i++) {
        entitites.push({
            userId: ids[i]
        })
    };

    const results = await source.getRepository(Users).remove(entitites)
    console.log(results)
    return ({
        statusCode: 200,
        body: JSON.stringify({
        }),
    })
}