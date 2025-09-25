import { NextFunction, Request, Response } from 'express'
import LoginService from '../services/login.service'
import config from '../config/default'
import { UserModel } from '../models/user.model'
import ResponseService from '../services/response.service'
import { BadRequestError } from '../errors/badRequestError'

export default class LoginController extends ResponseService {
  private loginService = new LoginService()

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body

      const { data, message, statusCode } = await this.loginService.login(
        email,
        password
      )

      const isProd = process.env.NODE_ENV === 'production'

      res.cookie('authToken', data, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })

      this.sendResponse(res, statusCode, data, message)
    } catch (error) {
      next(error)
    }
  }

  csrfToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.csrfToken !== 'function') {
        throw new BadRequestError('CSRF middleware not set up')
      }

      const csrfToken = req.csrfToken()

      this.sendResponse(
        res,
        200,
        { csrfToken },
        'CSRF token fetched successfully'
      )
    } catch (error) {
      next(error)
    }
  }

  whoami = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, message, statusCode } = await this.loginService.whoami(
        req.user.id
      )
      this.sendResponse(res, statusCode, data, message)
    } catch (err) {
      next(err)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('authToken', {
      httpOnly: true,
      sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
      secure: config.nodeEnv === 'production',
    })

    this.sendResponse(res, 200, {}, 'Logout successfully')
  }
}

const loginController = new LoginController()
export { loginController }