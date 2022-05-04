//Módulos o Librerías propios de NestJS
import { Injectable } from '@nestjs/common';
//Módulos o Librerías propias
import { DatabaseService } from './data/services/database.service';

@Injectable()
export class AppService {
  constructor(private _databaseService: DatabaseService) {}

  async getHello(): Promise<any> {
    const pool = this._databaseService.conexion;

    const data = await pool.query('SELECT * from auth_users', (err, res) => {
      console.log('Error:', err);
      console.log('Respuesta Total:', res);
      console.log('Respuesta:', res.rows);
      //Respodemos con un Objeto json

      pool.end();
    });
    return data;
  }
}
