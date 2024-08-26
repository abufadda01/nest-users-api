import { IsEmail, IsNotEmpty, isNumber } from "class-validator"

export class CreateUserDto{

    @IsNotEmpty()
    name : string
    
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    age : number
}