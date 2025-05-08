import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    // .addServer(swaggerConfig.server)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (swaggerConfig.contact) {
    document.info.contact = swaggerConfig.contact;
  }

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
