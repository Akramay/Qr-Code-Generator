import express, {Application, Request, Response} from 'express'
import session from 'express-session'
import { UserController } from './controllers/UserController';
import { PremiumUserMiddleware, UserLoggedInMiddleware } from './middleware/middleware';
import path from 'path'
require('dotenv').config()

const app: Application = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'Public')))

app.use(session({
        secret: process.env.session_secret!,
        saveUninitialized : true,
        resave: true,
        cookie: { 
            maxAge: 10 * 60 * 1000,  
            secure: false    
        }
    }
))

app.get('/', (req: Request, res: Response)=>{
   res.sendFile(path.join(__dirname, 'Views', 'index.html'))
})

app.get('/signup', (req: Request, res: Response)=>{
   res.sendFile(path.join(__dirname, 'Views', 'signup2.0.html'))
})
app.post('/signup', UserController.CreateUser)


app.get('/login', (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname, 'Views', 'login2.0.html'))
})
app.post('/login', UserController.LoginUser)


app.get('/convert', (req: Request, res:Response)=>{
    res.sendFile(path.join(__dirname, 'Views', 'converter.html'))
})

app.get('/allusers', UserController.FetchAllUsers)

app.listen(8000)