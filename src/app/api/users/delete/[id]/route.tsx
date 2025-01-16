import { PrismaClient } from "@prisma/client";
import { ErrorMessage } from "../../../../library/prismaErrorHandler";
export const config = {
    api: {
      bodyParser: false,
    },
};

type DeleteParams = {
    params: {
        id: string
    }
}
export async function DELETE(req: Request, {params}: DeleteParams){
    try{
        const {id} = await params;
        const Output:ResponseBody = {
            code: 200,
            message: 'User data deleted!',
            data: {},
        };
        
        if(!id){
            return Response.json({...Output, code: 400, message:'Require User ID', data: {}});
        }

        const client = new PrismaClient;
        console.log("Delete user ID", id);
        const deleteID = await client.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        return Response.json({...Output, data: deleteID});
    }catch(error){
        const errorMessage = ErrorMessage(error);
        console.log('Error occured: ', error);
        return Response.json(errorMessage);
    }
}