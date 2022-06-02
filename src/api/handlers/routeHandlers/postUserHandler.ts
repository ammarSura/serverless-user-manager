import { DataSource } from 'typeorm'
import { Users } from '../../../db/entity/Users.entity'
import { Context } from 'openapi-backend';


export const postUserHandler = async (c: Context, source: DataSource) => {
    
    console.log('postUser')
    console.dir(c.request.requestBody)
    // if (c.validation.valid) {
        const body = c.request.requestBody
        
        const results = await source
            .getRepository(Users)
            .save({
                ...body
            })
        return ({
            statusCode: 200,
            body: results
        })
   
}