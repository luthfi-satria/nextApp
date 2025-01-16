import { PrismaClient, User } from "@prisma/client";
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
    const allUser = await client.user.findMany({
        where: params
    });
    const Output:ResponseBody = {
        code: 200,
        message: 'request user',
        data: allUser,
    }
    
    return Response.json(Output);
}