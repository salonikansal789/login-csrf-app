import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import LoginController, { loginController } from "../controller/login.controller";
import { requireAuth } from "../middleware/auth.middleware";

class LoginRoute implements Routes {
  public path = '/user'
  public router = Router()
  public loginController = loginController

   constructor() {
    this.initializeRoutes()
  }
  private initializeRoutes() {

    this.router.post(`${this.path}/login`, 
    this.loginController.login
    )

    this.router.get(
      `${this.path}/csrf-token`,
       this.loginController.csrfToken 
    )

    this.router.get(`${this.path}/whoami`,
      requireAuth,
       this.loginController.whoami 
    )

    this.router.post(`${this.path}/logout`,
        requireAuth, 
    this.loginController.logout
    )


  }

}

export default LoginRoute