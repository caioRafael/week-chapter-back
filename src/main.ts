import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Week Chapter')
    .setDescription('A book system API')
    .setVersion('0.0')
    .addTag('Book')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
