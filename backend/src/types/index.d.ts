
export interface ITokenUser extends IUser {
  name: string
  id: string
  email:string
}

declare global {
  namespace Express {
    interface Request {
      user: ITokenUser
      csrfToken?: () => string
    }
  }
}

export {}
