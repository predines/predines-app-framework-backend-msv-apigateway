/**
 * Módulo de configuración: Cargamos la configuración de servicio (config.service.ts) como un proveedor y lo exportamos para que cualquier proceso lo tome.
 */
import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

@Module({
  //Asignamos un providers para que cuando importemos dicho módulo en otro lado, provea el provider
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}

//Cada vez que utilicemos o importemos éste módulo, lo utilicemos en otro lado, vamos a tener una instancia del servico que hemos creado.
