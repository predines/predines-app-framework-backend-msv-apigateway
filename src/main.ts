import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//Importamos el Logger para presentar mensajes más atractivos en consola.
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); //el Cors es para permitir que reciba consultas del cliente de otro dominio distinto al del backend
  //Instanciamos Logger y le indicamos que viene de éste método bootstrap
  const logger = new Logger('Bootstrap');

  //Primero, vamos a setear el prefijo "api" para que nuestros endpoint lo tengan y así nuestras APIS estén bien identificadas
  app.setGlobalPrefix('api');

  //============================================
  //Configuración de Swagger: DocumentBuilder
  //============================================

  const config = new DocumentBuilder()
    .setTitle('Predines AppFramework')
    .setDescription('Descripción de las APIs')
    .setVersion('1.0')
    .addTag('Predines')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('predines/api/docs', app, document, {
    explorer: true, //Para mostrar el explorador en el navegador
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  //Y asigno el puerto a mi servidor, cuya información ya se encuentra en la propiedad AppModule.port que he definido en el constructor del app.module.ts
  await app.listen(AppModule.port);

  logger.verbose(`Corriendo Servidor en puerto: ${AppModule.port}`);
  /*
  logger.log(`Corriendo Servidor en puerto: ${AppModule.port}`);
  logger.error(`Corriendo Servidor en puerto: ${AppModule.port}`);
  logger.warn(`Corriendo Servidor en puerto: ${AppModule.port}`);
  logger.debug(`Corriendo Servidor en puerto: ${AppModule.port}`);
  */
}
bootstrap();
