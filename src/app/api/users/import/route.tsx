import { ImportUserSchema } from "../../../data/schemas";
import { ErrorMessage } from "../../../library/prismaErrorHandler";
import { FileUploader } from '../../../library/fileUploader';
import { PrismaClient } from '@prisma/client';

export async function POST(req:Request){
    try{
        const body:FormData = await req.formData();
        const file:FormDataEntryValue = body.get('file') ?? '';

        const validateUser = ImportUserSchema.safeParse(file);
        const Output:ResponseBody = {
            code: 200,
            message: 'import user',
            data: [],
        };

        if(!validateUser.success){
            return Response.json({...Output, code: 400, message:'validation error', data: validateUser.error});
        }
        
        if(file){
            // Convert the file data to a Buffer
            const buffer = Buffer.from(await file?.arrayBuffer());
    
            // // Replace spaces in the file name with underscores
            const filename = file?.name?.replaceAll(" ", "_");
            
            // HANDLE FILE => MOVING FILE FROM TEMP FOLDER TO SPESIFIC DIRECTORY
            const conf = {
                createDirIfNotExists: true,
                dirPath: 'temp/',
                fileName: filename,
                fileContent: buffer,
            };
            // UPLOAD FILE TO TEMP
            const uploader = new FileUploader(conf);

            uploader.UploadFile();
            
            // READ FILE
            const readFile = await uploader
            .ReadFile()
            .then(async(input) => {
                return input;
            });

            if(readFile){
                const userLists = readFile.toString().split("\n");
                userLists.shift();

                if(userLists){
                    const result = [];
                    for(const items of userLists){
                        if(items != ''){
                            const obj = items.split(',');
                            result.push({
                                email: obj[0],
                                name: obj[1],
                                address: obj[2],
                                gender: ["Male","Female"].includes(obj[3]) ? obj[3] : 'Male',
                                phone: obj[4],
                            });
                        }
                    }

                    const client = new PrismaClient;
                    const insert = await client.user.createMany({
                        data: result,
                        skipDuplicates: true,
                    });
                    Output.data = insert;
                    uploader.DeleteFile();
                }
            }

        }
        return Response.json({...Output, message: 'users has been saved!'});
    }catch(error: any){
        const errorMessage = ErrorMessage(error);
        console.log('Error occured: ', error);
        return Response.json(errorMessage);
    }
}