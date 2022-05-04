import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { HelloMicroservice_Dto } from '../dto/hello-microservice.dto';
import { HelloMicroserviceEvent } from '../events/hello-microservice.event';
import { HelloMicroserviceRepository } from '../repository/hello-microservice.repository';

@Injectable()
export class HelloMicroserviceService {
  constructor(
    //Inyectamos el clienteKafka que hemos importado y definido en el app.modules.ts
    @Inject('SERVICE') private readonly _clientKafka: ClientKafka,
    private readonly _helloMicRepository: HelloMicroserviceRepository,
  ) {}

  async helloMicroserviceById_Srv(id: number): Promise<any> {
    //Hacemos la llamada al repositorio

    let data = await this._helloMicRepository.getHelloMicroserviceById_Rep(id);
    console.log('data.length', !data.length);

    if (!data.length) {
      throw new NotFoundException('No Existe Registro');
    }

    //Preparamos las propiedades de la respuesta:
    const statusCode = 200;
    const message = ['Successful'];
    const success = true;
    const error = null;

    const response = {
      statusCode,
      message,
      data,
      success,
      error,
    };

    console.log('Response:', response);

    //Existen distintos tipos de Evento que se pueden transmitir hacia Kafka: evento sin esperar respuesta y evento esperando respuesta.

    //En nuestro ejemplo vamos a emitir un Evento a Kakfa sin esperar respuesta, utilizando el cliente Kafka que hemos importado.

    //Lo que tenemos que considerar es que el evento tiene que enviar los datos en formato texto tipo JSON y no en objeto.
    //Para ello, nos vamos a soportar

    this._clientKafka.emit(
      'tpc_evento_apigateway',
      new HelloMicroserviceEvent(data.id, data.name, data.firstname),
    );

    return response;
  }
}
