import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const documentation = new DocumentBuilder()
    .setTitle('Sport Overlays API')
    .setDescription('API documentation for the Sport Overlays application')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentation);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
