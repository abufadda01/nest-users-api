import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { AnotherMiddleware } from './middlewares/another/another.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})


// to add our middleware we need to register it , configure it 
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer main middleware we use to apply any of our middlewares by using .apply(our_middleware_class).forRoutes("route_name_inside_the_@Controller(route_name)") // or pass the UsersController class it self , to apply this middleware for all this controller routes  
    // this will be applied for all this controller route methods
    consumer.apply(ExampleMiddleware).forRoutes("users")

    // this will be applied for specific controller routes
    // .forRoutes() could take more than one object each object will have the path : "the_main_controller_path/any_specific_extra_path" for its route , and req method : RequestMethod.GET/POST/PATCH/.... , then this middleware will only applied for these specific routes methods    
    // we could apply more than one middleware in nested way .apply(our_first_middleware_class).forRoutes("controller_main_name/or_specific_routes_objects").apply(our_second_middleware_class).forRoutes("controller_main_name/or_specific_routes_objects")
    consumer.apply(ExampleMiddleware).forRoutes( 
      {
      path : "users" ,
      method : RequestMethod.GET
      },
      {
      path : "users/:id" ,
      method : RequestMethod.GET
      },
      {
      path : "users" ,
      method : RequestMethod.POST
      },
      {
      path : "users/posts" ,
      method : RequestMethod.GET
      },
    ).apply(AnotherMiddleware).forRoutes(
      {
        path : "users/:id" ,
        method : RequestMethod.GET
      },
      {
        path : "users/posts" ,
        method : RequestMethod.GET
      },
    )
  }
}
