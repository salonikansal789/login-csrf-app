import { NextFunction, Request, Response } from 'express'
import LoginService from '../services/login.service';
import config from '../config/default';
import { UserModel } from '../models/user.model';
export default class LoginController {

  private loginService = new LoginService();

  login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const token = await this.loginService.login(email, password);

      const isProd = process.env.NODE_ENV === 'production';
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
      });

      return res.json({ success: true,token:token });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message || 'Server error' });
    }
  }

  csrfToken = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    if (typeof req.csrfToken !== 'function') {
      return res.status(500).json({ error: 'CSRF middleware not set up' });
    }
    return res.json({ csrfToken: req.csrfToken() });
  }

  whoami = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const user = await UserModel.findById(req.user.id).select('-passwordHash').lean();
      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.json({ user });
    } catch (err) {
      next(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    res.clearCookie('authToken', {
      httpOnly: true,
      sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
      secure: config.nodeEnv === 'production' ? true : false
    });
    return res.json({ success: true });
  }


} 