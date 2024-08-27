import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    console.log(request.headers)
    return false;
  }
}



// context parameter : Provides methods to access the details of the current execution context, such as the request and response objects in HTTP-based applications
// if the guard return true it will give access to the route method to execute , if it return false it will intercept and stop the request with 403 status