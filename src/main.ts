import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger/swagger.config';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export async function createApp() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

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
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (swaggerConfig.contact) {
    document.info.contact = swaggerConfig.contact;
  }

  SwaggerModule.setup('docs', app, document);

  await app.init();
  return server;
}

// Executa localmente se chamado diretamente
if (require.main === module) {
  createApp().then((app) => {
    app.listen(3000, () => {
      console.log('🚀 App running at http://localhost:3000');
    });
  });
}
