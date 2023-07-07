import './config/aliases';
import './config/env';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import { env } from '@src/config/env';
import { MyExceptionFilter } from '@src/core/filters/http-exception.filter';

async function enableDocumentation(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('SpeakEasy API')
    .setDescription('Easy chat for everyone')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('SpeakEasy')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new MyExceptionFilter());

  app.enableCors();

  if (env.NODE_ENV === 'development') {
    await enableDocumentation(app);
  }

  if (env.NODE_ENV === 'production') {
    app.setGlobalPrefix(env.GLOBAL_PREFIX_API);
  }

  await app.listen(env.APP_PORT, '0.0.0.0');
}
bootstrap();
