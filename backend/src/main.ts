import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cors
  app.enableCors();

  // Enable Class Validators
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
