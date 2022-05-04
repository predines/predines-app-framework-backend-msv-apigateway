//Esta clase me servirá para convertir el objeto entrante en un JSON String, ya que es texto lo que lo se envía en el mensaje
export class HelloMicroserviceEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly firstname: string,
  ) {}

  //Las clases tienen un método toString que devuelven la representación del objeto de la clase en una cadena de manera automática
  //Lo invocará internamente
  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      firstname: this.firstname,
    });
  }
}
