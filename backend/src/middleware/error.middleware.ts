import { IErrorOptions } from '../interface/errors.interface'
import { CustomApiError } from '../errors/customApiError'
import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let message: string = err.message
  let statusCode: number = err.statusCode
  const errOptions: IErrorOptions = err.options

  console.error('Error middleware: ', err)

  if (err instanceof CustomApiError) {
    console.log(JSON.stringify(err.message))
  } else if (!statusCode) {
    message = 'Something went wrong!'
    statusCode = 500
    console.log(`Error triggered from errorHandler: ${err.message}`)
  } else {
    message = 'Something went wrong!'
    statusCode = 500
     console.log(`Error triggered from errorHandler: ${err.message}`)
  }
   res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: errOptions?.data || {},
  })
  return ;
}

export default errorHandler
