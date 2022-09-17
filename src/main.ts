import { NestApplicationOptions, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationError } from 'class-validator'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/error/exception.filter'

async function bootstrap() {
  const nestAppOptions: NestApplicationOptions = {
    logger: process.env.NODE_ENV === 'production'
      ? ['error', 'warn']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  }
  const app = await NestFactory.create(AppModule, nestAppOptions)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (error: ValidationError[]) => error
  }));
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: true,
    methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['content-disposition', 'content-length', 'content-range'],
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('POOMGO')
    .setDescription('POOMGO API 문서')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()