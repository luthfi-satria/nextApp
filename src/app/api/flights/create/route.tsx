import { NextApiRequest } from "next";

export function POST(req: NextApiRequest){
    const BodyData = req.body;
    console.log(`INSERT flight data - params ${BodyData}`);
    
return Response.json({message: 'insert'});
}