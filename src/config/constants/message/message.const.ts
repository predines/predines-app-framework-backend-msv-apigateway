/**
 * Definición de las constantes para los mensajes
 */

export const MESSAGE_CONST = {
  AUTH: {
    SUCCESS: {
      RESP_SUCCESSFUL_REGISTER: 'Registro de Usuario Exitoso',
      RESP_SUCCESSFUL_LOGIN: 'Login Exitoso',
    },
    INFO: {
      RESP_VALIDATOR_USERNAME: 'El Usuario no puede estar vacío',
      RESP_VALIDATOR_PASSWORD: 'El Password no puede estar vacío',
    },
    WARNING: {
      RESP_EXCEPTION: 'Username o email ya existe',
      RESP_NOTFOUNDEXCEPTION: 'Username no existe',
      RESP_UNAUTHORIZEDEXCEPTION: 'Autentificación Incorrecta',
    },
    DANGER: {},
  },
  ROLE: {
    SUCCESS: {},
    INFO: {},
    WARNING: {
      RESP_EXCEPTION: 'Rol ya existe',
      RESP_NOTFOUNDEXCEPTION: 'Rol no existe o no hay en la lista',
      RESP_UNAUTHORIZEDEXCEPTION: 'No tiene autorización',
    },
    DANGER: {},
  },
  MENU: {
    SUCCESS: {
      RESP_SUCCESSFUL: 'Menu Exitoso',
    },
    INFO: {},
    WARNING: {
      RESP_EXCEPTION: 'Rol ya existe',
      RESP_NOTFOUNDEXCEPTION: 'Rol no existe o no hay en la lista',
      RESP_UNAUTHORIZEDEXCEPTION: 'No tiene autorización',
    },
    DANGER: {},
  },
  USER: {
    SUCCESS: {
      RESP_SUCCESS: 'Usuario creado correctamente',
    },
    INFO: {},
    WARNING: {
      RESP_EXCEPTION: 'Usuario ya existe',
      RESP_NOTFOUNDEXCEPTION: 'Usuario no existe o no hay en la lista',
    },
    DANGER: {},
  },
};
