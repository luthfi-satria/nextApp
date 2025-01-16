import { NextApiRequest, NextApiResponse } from "next";

export function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>){
   return res.status(401).json({code: 401, message: 'Not authenticated'});
}