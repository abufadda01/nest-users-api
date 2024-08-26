import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';


@Injectable()
export class UsersService {

    private users = [
        {id : 1 , name : "laith" , email : "laith@gmail.com"},
        {id : 2 , name : "moe" , email : "moe@gmail.com"},
        {id : 3 , name : "domy" , email : "domy@gmail.com"},
        {id : 4 , name : "jack" , email : "jack@gmail.com"},
    ]


    getAllUsers(){
        return this.users
    }



    createUser(userDto : CreateUserDto){
        this.users.push({...userDto , id : Date.now()})
        return userDto
    }



    getUserById(id : number){

        const user = this.users.find((user) => user.id.toString() === id.toString())
        
        return user
    }
 

}
