module.exports = {
    0: {
        "status": 200,
        "message": {
            "en": "Ok."
        }
    },
    1: {
        "status": 404,
        "message": {
            "en": "The endpoint does not exist.",
            "es": "El endpoint no existe."
        }
    },
    2: {
        "status": 500,
        "message": {
            "en": "Internal server error, please try again later.",
            "es": "Error interno del servidor, por favor intenta de nuevo mas tarde."
        }
    },
    3: {
        "status": 422,
        "message": {
            "en": "One or more JSON parameters are missing. Please consult the documentation.",
            "es": "Faltan uno o más parámetros JSON. Por favor consulte la documentación."
        }
    },
    4: {
        "status": 422,
        "message": {
            "en": "One or more JSON parameters contains the wrong data type. Please consult the documentation.",
            "es": "Uno o más parámetros JSON contienen el tipo de datos incorrecto. Por favor consulte la documentación."
        }
    },
    5: {
        "status": 405,
        "message": {
            "en": "Method not allowed on this endpoint.",
            "es": "Método no permitido en este endpoint."
        }
    },
    100: {
        "status": 400,
        "message": {
            "en": "You must specify the \"Content-Type\" header.",
            "es": "Debes especificar el encabezado \"Content-Type\"."
        }
    },
    101: {
        "status": 415,
        "message": {
            "en": "The \"Content-Type\" header must especify \"application/json\".",
            "es": "El encabezado \"Content-Type\" debe especificar \"application/json\"."
        }
    },
    102: {
        "status": 400,
        "message": {
            "en": "You must specify the \"Accept\" header.",
            "es": "Debes especificar el encabezado \"Accept\"."
        }
    },
    103: {
        "status": 406,
        "message": {
            "en": "The \"Accept\" header must especify \"application/json\".",
            "es": "El encabezado \"Accept\" debe especificar \"application/json\"."
        }
    },
    104: {
        "status": 413,
        "message": {
            "en": "The request body is too large; the maximum length is 100 kb.",
            "es": "El cuerpo de la solicitud es demasiado grande; la longitud máxima es 100 kb."
        }
    },
    105: {
        "status": 400,
        "message": {
            "en": "The request body is not valid JSON.",
            "es": "El cuerpo de la solicitud no es un JSON válido."
        }
    },
    1000: {
        "status": 401,
        "message": {
            "en": "The username o password are incorrect. Try again.",
            "es": "El nombre de usuario o la contraseña son incorrectos. Intentalo de nuevo."
        }
    },
    1001: {
        "status": 422,
        "message": {
            "en": "Account is scheduled for deletion, you must cancel it before logging in.",
            "es": "La cuenta está programada para ser eliminada, debes cancelarla antes de iniciar sesión."
        }
    },
    1002: {
        "status": 409,
        "message": {
            "en": "Account is scheduled for deletion, you must cancel it before logging in.",
            "es": "La cuenta está programada para ser eliminada, debes cancelarla antes de iniciar sesión."
        }
    },
    1003: {
        "status": 403,
        "message": {
            "en": "You need to verify your email before logging into your account.",
            "es": "Necesita verificar su correo electrónico antes de iniciar sesión en su cuenta."
        }
    },
    1004: {
        "status": 409,
        "message": {
            "en": "The account was deleted.",
            "es": "La cuenta fue eliminada."
        }
    },
    1005: {
        "status": 403,
        "message": {
            "en": "Your account is banned.",
            "es": "Tu cuenta esta bloqueada."
        }
    },
    1006: {
        "status": 451,
        "message": {
            "en": "Your account is banned for legal reasons.",
            "es": "Tu cuenta esta bloqueada por razones legales."
        }
    },
    1007: {
        "status": 409,
        "message": {
            "en": "You have already been authenticated.",
            "es": "Ya has sido autenticado."
        }
    },
    1008: {
        "status": 422,
        "message": {
            "en": "You must be 13 years or older to register.",
            "es": "Debes tener 13 años o más para registrarte."
        }
    },
    1009: {
        "status": 422,
        "message": {
            "en": "The username must be between 2 and 32 in length and contain characters A to Z (except dots and underscores).",
            "es": "El nombre de usuario debe tener entre 2 y 32 de longitud y contener caracteres de la A a la Z (excepto puntos y guiones bajos)."
        }
    },
    1010: {
        "status": 422,
        "message": {
            "en": "The password must be between 2 and 64 in length.",
            "es": "La contraseña debe tener entre 2 y 64 de longitud."
        }
    },
    1011: {
        "status": 422,
        "message": {
            "en": "The email is not valid.",
            "es": "El correo electrónico no es válido."
        }
    },
    1012: {
        "status": 422,
        "message": {
            "en": "The username is already in use.",
            "es": "El nombre de usuario ya está en uso."
        }
    },
    1013: {
        "status": 422,
        "message": {
            "en": "The email is already in use.",
            "es": "El correo electrónico ya está en uso."
        }
    },
    1014: {
        "status": 201,
        "message": {
            "en": "Account created successfully.",
            "es": "Cuenta creada con éxito."
        }
    },
    1015: {
        "status": 201,
        "message": {
            "en": "Account created successfully but you need to verify your email before logging into your account.",
            "es": "Cuenta creada con éxito pero necesitas verificar tu correo electrónico antes de iniciar sesión en su cuenta."
        }
    },
    1016: {
        "status": 401,
        "message": {
            "en": "The token is not valid.",
            "es": "El token no es válido."
        }
    },
    1017: {
        "status": 401,
        "message": {
            "en": "The token schema is not valid.",
            "es": "El esquema del token no es válido."
        }
    },
    1018: {
        "status": 401,
        "message": {
            "en": "The token is expired.",
            "es": "El token esta caducado."
        }
    },
    1019: {
        "status": 401,
        "message": {
            "en": "The token is valid but must be used later.",
            "es": "El token es válido pero debe usarse más tarde."
        }
    },
    1020: {
        "status": 422,
        "message": {
            "en": "The code is not valid.",
            "es": "El code no es válido."
        }
    },
    1021: {
        "status": 422,
        "message": {
            "en": "The email is not in use.",
            "es": "El correo electrónico no está en uso."
        }
    },
    1022: {
        "status": 403,
        "message": {
            "en": "You can't do that due to your account status.",
            "es": "No puede hacer eso debido al estado de su cuenta."
        }
    },
    1023: {
        "status": 422,
        "message": {
            "en": "The code is expired.",
            "es": "El code esta caducado."
        }
    },
    1024: {
        "status": 422,
        "message": {
            "en": "The code is valid but must be used later.",
            "es": "El code es válido pero debe usarse más tarde."
        }
    },
    1025: {
        "status": 409,
        "message": {
            "en": "The new password can't be the same as the previous one.",
            "es": "La nueva contraseña no puede ser la misma que la anterior."
        }
    },
    2000: {
        "status": 404,
        "message": {
            "en": "User not found.",
            "es": "Usuario no encontrado."
        }
    },
    2001: {
        "status": 401,
        "message": {
            "en": "You must log in before viewing your profile.",
            "es": "Debes iniciar sesión antes de ver tu perfil."
        }
    }
};