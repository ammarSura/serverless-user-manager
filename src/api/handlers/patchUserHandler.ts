import { Users } from '../../db/entity/Users.entity'

export const patchUserHandler = async (c, event, context, source) => {
    
    console.log('patchUser')

    const users = JSON.parse(event.body)
        console.log(users)
        
        const results = await source.getRepository(Users).save(users)
        return ({
            statusCode: 200,
            body: JSON.stringify({
                results: results
            }),
        })
}