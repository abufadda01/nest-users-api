import { ArgumentMetadata, HttpException, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';


@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {

    console.log("inside custom pipe")

    console.log(value) // to access the incomming value from the route method , The incoming data that needs to be transformed or validated.
    console.log(metadata) // to get extra info about from where we get this data in our case will be the req body object , Provides metadata about the data, such as the type (e.g., body, query, param).

    const parsedAgeToInt = parseInt(value.age)

    // to ensure that our req body age key converted to number
    if(isNaN(parsedAgeToInt)){
      throw new HttpException("invalid age value" , HttpStatus.BAD_REQUEST)
    }

    console.log({...value , age : parsedAgeToInt})

    return value;

  }

}





// nest g pi pipeName // to generate custom pipe
// to use our custom pipe we add it inside the @Body() decorator to apply it on route method level
// we use pipes for data validation , transformation