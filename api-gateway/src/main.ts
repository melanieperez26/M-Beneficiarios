import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
