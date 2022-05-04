//Módulos o Librerías de NestJS
import { Injectable, Logger } from '@nestjs/common';

//Módulos o Librerías de terceros
import { Pool } from 'pg';

//Módulos o Librerías Propias
import { CONFIGURATION_ENUM } from 'src/config/enums/config.enum';
import { ConfigService } from 'src/config/services/config.service';

@Injectable()
export class DatabaseService {
  constructor(private _envConfig: ConfigService) {}

  get conexion() {
    const logger = new Logger('DatabaseService');
    const pool = new Pool({
      host: this._envConfig.get(CONFIGURATION_ENUM.PG_HOST),
      user: this._envConfig.get(CONFIGURATION_ENUM.PG_USERNAME),
      password: this._envConfig.get(CONFIGURATION_ENUM.PG_PASSWORD),
      database: this._envConfig.get(CONFIGURATION_ENUM.PG_DATABASE),
      port: parseInt(this._envConfig.get(CONFIGURATION_ENUM.PG_PORT)),
    });

    logger.verbose('Conexión BD Exitosa');
    //console.log('Pool de Conexión:', pool);
    return pool;
  }
}
