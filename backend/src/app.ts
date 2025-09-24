import express from 'express'
import config from './config/default'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Routes } from './interface/routes.interface'
import dbConnection from './utils/mongo'
import csurf from 'csurf';
import morgan from 'morgan'

const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: config.nodeEnv === 'production' ? 'none' :'lax',
    secure: config.nodeEnv === 'production'? true : false
  }
});

class App {
  public app: express.Application
  public port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.port = config.port

    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling();

  }

  public async listen() {
    try {
      this.app.listen(this.port, () => {
         console.log(`Server running on the port ${this.port}`)
      })
    } catch (error) {
        console.log(error)
    }
  }

  public getServer() {
    return this.app
  }

  private connectToDatabase() {
    dbConnection()
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: '*', credentials:true }))
    this.app.use(express.json({ limit: '50mb'}))
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(cookieParser())
    this.app.use((req, res, next) => {
        if (req.path === '/api/user/login') return next();
        return csrfProtection(req, res, next);
      });    
    this.app.use(morgan('dev'));
  }



  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/', route.router)
    })
  }

   private initializeErrorHandling() {
    this.app.use(
      (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (err && err.code === 'EBADCSRFTOKEN') {
          return res.status(403).json({ error: 'Invalid CSRF token' });
        }
        next(err);
      }
    );
  }
 
}

export default App


