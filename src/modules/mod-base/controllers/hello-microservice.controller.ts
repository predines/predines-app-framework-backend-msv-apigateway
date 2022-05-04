import { Controller, Get, Param } from '@nestjs/common';

import { HelloMicroserviceService } from '../data/services/hello-microservice.service';

@Controller('hello-microservice') //El nombre del EndPoint: Debe ser llamado como: http://localhost:5000/api/hello-microservice/:id    ---cambiar :id por el id real
export class HelloMicroserviceController {
  constructor(private readonly _helloMicroService: HelloMicroserviceService) {}

  @Get(':id')
  getHelloMicroserviceById(@Param('id') id: string) {
    return this._helloMicroService.helloMicroserviceById_Srv(+id);
  }
}
