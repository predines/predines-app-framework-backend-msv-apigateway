/**
 * Clase que me permite setear las variables de entorno, dependiendo si estamos en desarrollo o producción.
 */
import * as fs from 'fs'; //importamos el módulo de file system (fs) de node. Esto es para pode usar el método envFilePath, que sirve para la lectura de archivos.
import { parse } from 'dotenv'; //Nos sirve para parsear (conertir en un objeto) el archivo .env

export class ConfigService {
  //Generamos una propiedad o variable para capturar las variables de entorno, de tipo objeto.
  private readonly envConfig: { [key: string]: string };

  constructor() {
    //Vamos a crear una variable para saber si estamos en producción o en desarollo. Será un booleano
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production'; //Le indicamos que sea verdadero si la variable de entorno de desarrollo sea diferente a producción.

    //Si estamos en el entorno de desarollo, elegimos nuestro propio archivo .env, ya que en producción debe de existir su propio archivo .env
    if (isDevelopmentEnv) {
      //Le asignamos el file .env que hemos creado

      //Capturamos el archivo .env de la ruta en donde debería de estar.
      const envFilePath = __dirname + '/../../../.env';

      //Evaluamos si el archivo .env existe

      const existsPath = fs.existsSync(envFilePath);
      //Si el arvhivo no existe, entonces imprimimos en consola que el archivo .env no existe

      if (!existsPath) {
        console.log('Archivo .env no existe');
        //salimos del proceso.
        process.exit(0);
      } else {
        //Si archivo existe, entonces se lo asignamos a la variable
        this.envConfig = parse(fs.readFileSync(envFilePath)); //El método parse va a convertir la información del .env en un objeto.
      }
    } else {
      //Si estamos en producción, se le asigna el puerto del archivo .env de producción.
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  //Generamos un método que me permita obtener la variable envConfig, deacuerdo al Key que deseemos.

  get(key: string): string {
    //console.log('ENVCONFIG:', this.envConfig);
    return this.envConfig[key];
  }

  //Éste servicio lo vamos a importar en nuestro config.module.ts
}
