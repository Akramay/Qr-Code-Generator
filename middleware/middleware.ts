import { Request, Response, NextFunction } from "express";

export function UserLoggedInMiddleware(req: Request, res: Response, next: NextFunction){
    if(req.session.user && req.session.user.email){
        next()
    }
    else{
        res.status(301).redirect('/login')
    }
}
export function PremiumUserMiddleware(req:Request, res:Response, next: NextFunction){
    if(req.session.user?.user_type == 1){
        next()
    }
    else{
        res.status(301).redirect('/pricing');
    }
}