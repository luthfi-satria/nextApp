import { PrismaClient } from "@prisma/client";
import { AddUser, AddUserSchema } from "../../../data/schemas";
import { ErrorMessage } from "../../../library/prismaErrorHandler";

export const config = {
    api: {
      bodyParser: false,
    },
};

export async function POST(req: Request){
    try{
        const body:AddUser = await req.json();
        const validateUser = AddUserSchema.safeParse(body);
        const Output:ResponseBody = {
            code: 200,
            message: 'insert new user',
            data: body,
        };
        
        if(!validateUser.success){
            return Response.json({...Output, code: 400, message:'validation error', data: validateUser.error});
        }
    
        const client = new PrismaClient;
        console.log("Insert new user", body);
        const insert = await client.user.create({data: body});
        return Response.json({...Output, data: insert});
    }catch(error){
        const errorMessage = ErrorMessage(error);
        return Response.json(errorMessage);
    }
}