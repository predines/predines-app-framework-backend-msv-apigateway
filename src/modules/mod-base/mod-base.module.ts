import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/data/data.module';
import { HelloMicroserviceRepository } from './data/repository/hello-microservice.repository';
import { HelloMicroserviceService } from './data/services/hello-microservice.service';
import { HelloMicroserviceController } from './controllers/hello-microservice.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

//Registramos el cliente de microservicio con transportador Kafka por donde el api gateway enviará los mensajes al broker Kakfa
const ClientKafka: any = ClientsModule.register([
  {
    name: 'SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'mod-base-service',
        brokers: ['localhost:9092'], //Cambiar por la URL donde está escuchando nuestro servicio Kafka
      },
      consumer: {
        groupId: 'consumer-service', //Id del Grupo de Consumidores de Kafka, que sirve para identificar al grupo de consumidores como únicos en un clúster de Kafka
      },
    },
  },
]);

@Module({
  imports: [DatabaseModule, ClientKafka],
  providers: [HelloMicroserviceService, HelloMicroserviceRepository],
  controllers: [HelloMicroserviceController],
})
export class ModBaseModule {}
