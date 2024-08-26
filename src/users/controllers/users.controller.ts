import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from '../pipes/validate-create-user/validate-create-user.pipe';


@Controller('users')
export class UsersController {

    // inject our user service in our controller , define it only once in the constructor to not make new instance in each controller route 
    constructor(private usersService : UsersService){}


    @Get()
    getUsers(){
        return this.usersService.getAllUsers()
    }


    @Get("posts")
    // @UsePipes(ParseIntPipe, ValidationPipe) // combine multi pipes
    getUsersPosts(){
        return []
    }

 
    @Post()
    // now we trigger that we must go to our dto definition class and check what validation cases we have and compare it with our req body object , and this validation pipe case will be applied to route level , also we can add it inside the @Body() decorator , Used to validate incoming data against DTOs
    @UsePipes(new ValidationPipe()) 
    // userDto will be the extracted json object from the req body , its structure and properties will be as the defined dto , but still has no validatin cases to check the required keys and required values so we must add validation cases as pipes 
    // the ValidateCreateUserPipe custom pipe will has access to our incomming req body object and make any nesscsary transformation , to make sure that if we want to use any of the req body object keys to use it with its correct value and type
    createUser(@Body(new ValidateCreateUserPipe()) userDto : CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    

    @Get("/:id") // add defined params to the req url called id
    getUserById(@Param("id" , ParseIntPipe) id : number){ // build in pipe ParseIntPipe that convert our id to integer number value to check that its a number 
        const user = this.usersService.getUserById(id)
        // to handle the case where the user not exist by throw new HttpException(error_msg , error_status_code)  
        if (!user) throw new HttpException(`user with this id ${id} not found` , HttpStatus.NOT_FOUND)
        return user
    }


}








