//Módulos de NestJS
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Módulos propios

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/services/config.service';
import { CONFIGURATION_ENUM } from './config/enums/config.enum';
import { DatabaseModule } from './data/data.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

//import { SharedModule } from './shared/shared.module';
import { ModBaseModule } from './modules/mod-base/mod-base.module';

//Registramos el cliente de microservicio con transportador Kafka por donde el api gateway enviará los mensajes al broker Kakfa
const ClientKafka: any = ClientsModule.register([
  {
    name: 'SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: '',
        brokers: ['localhost:9092'], //Cambiar por la URL donde está escuchando nuestro servicio Kafka
      },
      consumer: {
        groupId: 'consumer', //Id del Grupo de Consumidores de Kafka, que sirve para identificar al grupo de consumidores como únicos en un clúster de Kafka
      },
    },
  },
]);

@Module({
  imports: [
    //ClientKafka,
    ConfigModule,
    DatabaseModule,
    ModBaseModule,
    //  SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //Vamos a declarar una varibale estática, y que significa que no es necesario crear una instancia (un objeto) para acceder a ella, ya que estará en memoria.
  //Además, no accedo con this, sino con el nombre de la clase, en éste caso AppModule

  static port: number | string;

  //Vamos a inyectar al constructor de mi módulo principal el objeto con las variables de entorno
  constructor(private readonly _configService: ConfigService) {
    //Se le coloca guión bajo para indicar que es un servicio inyectado

    //Seteamos el PORT para el AppModule, obteniéndolo del serrvicio config.service.ts. Nota: Al ser port una variable estática, no lo llamo con this, sino con el nombre de la clase.
    AppModule.port = this._configService.get(CONFIGURATION_ENUM.PORT);
  }
}
