import { Context, Request } from 'openapi-backend';
import { DataSource } from 'typeorm';
import { Users } from '../../../db/entity/Users.entity'


export const getUserHandler = async (c: Context, source: DataSource) => {

    console.log('getUser') 

        const queryParams = c.request.query   
    
        const results = await source.getRepository(Users).find({
            where: {
                ...queryParams
            }
        })

        return (results)
    
}