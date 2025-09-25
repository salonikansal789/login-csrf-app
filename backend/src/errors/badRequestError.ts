import { CustomApiError } from './customApiError'
import { IErrorOptions } from '../interface/errors.interface'  

class BadRequestError extends CustomApiError {
  statusCode = 400
  options?: IErrorOptions
  constructor(message: string, options?: IErrorOptions) {
    super(message)
    this.options = options
  }
}

export { BadRequestError }
