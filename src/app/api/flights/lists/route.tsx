import { NextApiRequest } from "next";

export function GET(req: NextApiRequest){
    const params = req.body;
    console.log(`SEND GET FLIGHT LIST with params ${params} ${process.env.DB_CONNECTION}`);
    
return Response.json({message: 'request'});
}