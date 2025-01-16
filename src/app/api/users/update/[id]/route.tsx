import { PrismaClient } from "@prisma/client";
import { EditUser, EditUserSchema } from "../../../../data/schemas";
import { ErrorMessage } from "../../../../library/prismaErrorHandler";
export const config = {
    api: {
      bodyParser: false,
    },
};

type UpdateParams = {
    params: {
        id: string
    }
}
export async function PUT(req: Request, {params}: UpdateParams){
    try{
        const {id} = await params;
        const body: EditUser = await req.json();
        const validateUser = EditUserSchema.safeParse(body);
        const Output:ResponseBody = {
            code: 200,
            message: 'update user',
            data: body,
        };
        
        if(!validateUser.success){
            return Response.json({...Output, code: 400, message:'validation error', data: validateUser.error});
        }

        const client = new PrismaClient;
        console.log("Update user", body);
        const update = await client.user.update({
            where: {
                id: parseInt(id),
            },
            data: body,
        });
        return Response.json({...Output, data: update});
    }catch(error){
        const errorMessage = ErrorMessage(error);
        console.log('Error occured: ', error);
        return Response.json(errorMessage);
    }
}