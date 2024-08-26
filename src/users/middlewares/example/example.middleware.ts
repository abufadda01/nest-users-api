import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


// so it could be injected in any related class or related field
@Injectable() 
// here where we place the middleware logic itslef , and we configure it in the module
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log("hello from middleware")

    const {authorization : authHeader} = req.headers

    if(!authHeader || !authHeader.startsWith("Bearer")){
      throw new HttpException("Not authorized" , HttpStatus.FORBIDDEN)
    }

    console.log("authorized")

    next(); // the next function will be the route controller method

  }
  
}




// middleware function that called before the route handler method to apply or check certain thing
// middleware function has access to the request and response object and the next function that allows us to call next middleware function in the middleware pipline
// nest g mi middleware_name  // to generate new middlware file