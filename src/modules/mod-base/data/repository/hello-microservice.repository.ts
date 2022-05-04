import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/services/database.service';

@Injectable()
export class HelloMicroserviceRepository {
  //Inyectamos en el constructor el dataservice de mi proyecto, que internamente tiene toda la conexión hacia la base de datos.
  constructor(private readonly _databaseService: DatabaseService) {}

  /**
   * ====== CONSULTA A LA TABLA DE PRUEBA: xpl_hello ========
   * xpl_hello es una tabla que contiene los campos: id, name, firstname
   */

  async getHelloMicroserviceById_Rep(id: number): Promise<any> {
    const pool = this._databaseService.conexion;
    const data = await pool.query(
      'SELECT * FROM sp_xpl_hello_microservice_by_id($1)',
      [id],
    );
    pool.end();
    return data.rows;
  }
}
