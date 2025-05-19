import { Request, Response, NextFunction } from "express";
import { User } from "../Models/user";
import bcrypt from 'bcrypt'
import session from "express-session";


declare module 'express-session'{
    interface SessionData {
        user : User;
    }
}


export class UserController {

    static async CreateUser(req : Request, res: Response){
        console.log(`Request : ${req.body}`)
        const {email, password} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 12) 
            const  created = await User.findOrCreate({where : {email : email}, defaults : {email: email, password : hashedPassword, user_type : 0}})
            if(created){
                res.status(400).json({message : "User with that email already exists, try to Login!"});
            }
            else{ 
                res.status(200).json({message : `User Created`})
            }
        }
        catch(err){
            res.status(500).send(`<h1>Error Creating User</h1>`)
        }
    }
    static async LoginUser(req: Request, res: Response){
        const {email, password} = req.body;
        try {
            const user = await User.findOne({where :{
                email : email,
            }})
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).redirect('/convert');
            }
            else{
                console.log(`${email} tried to login and failed`)
                res.status(400).send('Login Failed')
            }
        } catch (error) {
            console.log(error)
            res.status(500).send('<h1>Error Logging in</h1>')
        }
    }
    static async FetchAllUsers(req: Request, res: Response){
        try {
            const users = await User.findAll();
            res.send(users)
        } catch (error) {
            console.log(error)
            res.status(500).send('<h1>Error Fetching Users</h1>')
        }
    }
    static LogoutUser(req: Request, res: Response){
        req.session.destroy((err)=>{
            if(err){
                res.status(500).send('<h1>Error Logging out, Try again!</h1>')
            }
            else{
                res.status(301).redirect('/')
            }
        })
    }
}