import { PrismaClient, User } from "@prisma/client";
import { tableConfig } from "../../../data/constants";
type searchUser = {
    name?: {
        contains: string | undefined
    },
    email?: {
        contains: string | undefined
    },
    phone?: {
        contains: string | undefined
    },
}
export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    let params:Partial<searchUser> = {};
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || tableConfig.defaultLimit);
    const offset = (page - 1) * limit;

    if(searchParams.get('email')){
        params = {...params, email: {contains: searchParams.get('email') || undefined}}
    }
    if(searchParams.get('name')){
        params = {...params, name: {contains: searchParams.get('name') || undefined}}
    }
    if(searchParams.get('phone')){
        params = {...params, phone: {contains: searchParams.get('phone') || undefined}}
    }
    
    console.log(`LIST users - params ${searchParams}`);
    const client = new PrismaClient;
    const totalUser = await client.user.count();
    const allUser = await client.user.findMany({
        where: params,
        skip: offset,
        take: limit,
    });
    const apiDataResponse: APIdataResponse = {
        page: page,
        total: totalUser,
        totalFiltered: allUser.length,
        totalPage: (Math.ceil(allUser.length / limit)),
        results: allUser,
    };
    const Output:ResponseBody = {
        code: 200,
        message: 'request user',
        data: apiDataResponse,
    }
    
    return Response.json(Output);
}