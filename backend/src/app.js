import 'dotenv/config'

import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import { resolve } from 'path'
import Youch from 'youch'
import * as Sentry from '@sentry/node'

import redis from 'redis'
import RateLimit from 'express-rate-limit'
import RateLimitRedis from 'rate-limit-redis'

import 'express-async-errors'

import routes from './routes'
import sentryConfig from './config/sentry'
import redisConfig from './config/redis'

import './database'

class App {
  constructor() {
    this.server = express()
    this.isDev = process.env.NODE_ENV === 'development'

    Sentry.init(sentryConfig)

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler())
    this.server.use(helmet())
    this.server.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    )
    this.server.use(express.json())
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    )

    if (!this.isDev) {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient(redisConfig),
          }),
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      )
    }
  }

  routes() {
    this.server.use(routes)
    this.server.use(Sentry.Handlers.errorHandler())
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (this.isDev) {
        const errors = await new Youch(err, req).toJSON()

        return res.status(500).json(errors)
      }

      return res.status(500).json({ error: 'Internal server error' })
    })
  }
}

export default new App().server
