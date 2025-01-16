import { Prisma } from "@prisma/client"

type PrismaError = {
    code: Number,
    message?: string,
    errorFields?: Record<string, unknown>
}

export const ErrorMessage = (error:any) => {
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        let errors: PrismaError = {code: 400};
        errors.errorFields = error?.meta;
        switch(error.code){
            case "P2000" : 
                errors.message = `Data is too long`
                break;
            case "P2001" : 
                errors.message = `Field is not exists`
                break;
            case "P2002" : 
                errors.message = `Unique constraint violation`
                break;
            case "P2003" : 
                errors.message = `Foreign key constraint violation`
                break;
            case "P2004" : 
                errors.message = `Constraint failed`
                break;
            case "P2005" : 
                errors.message = `Invalid datatype`
                break;
            case "P2006" : 
                errors.message = `Invalid data`
                break;
            case "P2007" : 
                errors.message = `Validation error`
                break;
            default :
                errors.message = `Undefined error`
        }
        return errors;
    }
    return error;
}