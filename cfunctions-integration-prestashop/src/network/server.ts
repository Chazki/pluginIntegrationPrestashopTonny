import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import pino, { HttpLogger } from 'express-pino-logger'

import { applyRoutes } from './router'
import { sequelizeConnection } from '../database'

const PORT = (process.env.PORT as string) || 1996

class Server {
  public app: Application
  #log: HttpLogger

  constructor() {
    this.app = express()
    this.#log = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
    this.#config()
    this.#sequelize()
  }

  #config() {
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(
      (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        res.header('x-powered-by', 'Simba.js')
        next()
      }
    )
    applyRoutes(this.app)
  }

  async #sequelize(): Promise<void> {
    try {
      await sequelizeConnection.authenticate()
      console.log('Database connection established')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message)
      process.exit(1)
    }
  }
}

export default new Server().app
