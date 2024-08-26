import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExampleMiddleware } from './users/middlewares/example/example.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Apply global middleware
    // app.use(new ExampleMiddleware());
  await app.listen(3000);
}
bootstrap();
