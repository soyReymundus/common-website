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
            "es": "El endpoint no existe.",
            "ja": "エンドポイントは存在しません。"
        }
    },
    2: {
        "status": 500,
        "message": {
            "en": "Internal server error, please try again later.",
            "es": "Error interno del servidor, por favor intenta de nuevo mas tarde.",
            "ja": "サーバー内部エラーが発生しました。後でもう一度お試しください。"
        }
    },
    3: {
        "status": 422,
        "message": {
            "en": "One or more JSON parameters are missing. Please consult the documentation.",
            "es": "Faltan uno o más parámetros JSON. Por favor consulte la documentación.",
            "ja": "1つ以上のJSONパラメータが欠落しています。ドキュメントを参照してください。"
        }
    },
    4: {
        "status": 422,
        "message": {
            "en": "One or more JSON parameters contains the wrong data type. Please consult the documentation.",
            "es": "Uno o más parámetros JSON contienen el tipo de datos incorrecto. Por favor consulte la documentación.",
            "ja": "1つ以上のJSONパラメータに誤ったデータ型が含まれています。ドキュメントを参照してください。"
        }
    },
    5: {
        "status": 405,
        "message": {
            "en": "Method not allowed on this endpoint.",
            "es": "Método no permitido en este endpoint.",
            "ja": "このエンドポイントではメソッドは許可されていません。"
        }
    },
    6: {
        "status": 409,
        "message": {
            "en": "There is a conflict that the server can not handle.",
            "es": "Hay un conflicto que el servidor no puede gestionar.",
            "ja": "サーバーが処理できない競合があります。"
        }
    },
    7: {
        "status": 422,
        "message": {
            "en": "One or more QUERY parameters are missing. Please consult the documentation.",
            "es": "Faltan uno o más parámetros QUERY. Por favor consulte la documentación.",
            "ja": "1つ以上のQUERYパラメータが欠落しています。ドキュメントを参照してください。"
        }
    },
    8: {
        "status": 422,
        "message": {
            "en": "One or more QUERY parameters contains the wrong data type. Please consult the documentation.",
            "es": "Uno o más parámetros QUERY contienen el tipo de datos incorrecto. Por favor consulte la documentación.",
            "ja": "1つ以上のQUERYパラメータに誤ったデータ型が含まれています。ドキュメントを参照してください。"
        }
    },
    9: {
        "status": 501,
        "message": {
            "en": "HTTP method not implemented.",
            "es": "Método HTTP no implementado.",
            "ja": "HTTPメソッドが実装されていません。"
        }
    },
    100: {
        "status": 400,
        "message": {
            "en": "You must specify the \"Content-Type\" header.",
            "es": "Debes especificar el encabezado \"Content-Type\".",
            "ja": "\"Content-Type\"ヘッダーを指定する必要があります。"
        }
    },
    101: {
        "status": 415,
        "message": {
            "en": "The \"Content-Type\" header must especify \"application/json\".",
            "es": "El encabezado \"Content-Type\" debe especificar \"application/json\".",
            "ja": "\"Content-Type\"ヘッダーは\"application/json\"を指定する必要があります。"
        }
    },
    102: {
        "status": 400,
        "message": {
            "en": "You must specify the \"Accept\" header.",
            "es": "Debes especificar el encabezado \"Accept\".",
            "ja": "\"Accept\"ヘッダーを指定する必要があります。"
        }
    },
    103: {
        "status": 406,
        "message": {
            "en": "The \"Accept\" header must especify \"application/json\".",
            "es": "El encabezado \"Accept\" debe especificar \"application/json\".",
            "ja": "\"Accept\"ヘッダーは\"application/json\"を指定する必要があります。"
        }
    },
    104: {
        "status": 413,
        "message": {
            "en": "The request body is too large; the maximum length is 100 kb.",
            "es": "El cuerpo de la solicitud es demasiado grande; la longitud máxima es 100 kb.",
            "ja": "リクエストの本文が大きすぎます。最大長は100 kbです。"
        }
    },
    105: {
        "status": 400,
        "message": {
            "en": "The request body is not valid JSON.",
            "es": "El cuerpo de la solicitud no es un JSON válido.",
            "ja": "リクエストの本文は有効なJSONではありません。"
        }
    },
    106: {
        "status": 400,
        "message": {
            "en": "You must accept the terms of service to use this API.",
            "es": "Debe aceptar los términos de servicio para utilizar esta API.",
            "ja": "このAPIを使用するには、サービスの利用規約に同意する必要があります。"
        }
    },
    107: {
        "status": 403,
        "message": {
            "en": "We need to verify that you are human, please complete the captcha.",
            "es": "Necesitamos verificar que eres humano, por favor completa el captcha.",
            "ja": "あなたが人間であることを確認する必要があります。キャプチャを完了してください。"
        }
    },
    108: {
        "status": 403,
        "message": {
            "en": "Robots are not allowed.",
            "es": "No se permiten robots.",
            "ja": "ロボットは許可されていません。"
        }
    },
    109: {
        "status": 502,
        "message": {
            "en": "Could not connect to the servers of reCAPTCHA , please try again later.",
            "es": "No se pudo conectar a los servidores de reCAPTCHA, por favor intenta de nuevo mas tarde.",
            "ja": "reCAPTCHAのサーバーに接続できませんでした。後でもう一度お試しください。"
        }
    },
    110: {
        "status": 504,
        "message": {
            "en": "The servers of reCAPTCHA have not responded, please try again later.",
            "es": "Los servidores de reCAPTCHA no han respondido, por favor intenta de nuevo mas tarde.",
            "ja": "reCAPTCHAのサーバーが応答しませんでした。後でもう一度お試しください。"
        }
    },
    111: {
        "status": 502,
        "message": {
            "en": "The servers of reCAPTCHA gave an invalid response, please try again later.",
            "es": "Los servidores de reCAPTCHA dieron una respuesta no válida, por favor intenta de nuevo mas tarde.",
            "ja": "reCAPTCHAのサーバーが無効な応答を返しました。後でもう一度お試しください。"
        }
    },
    112: {
        "status": 403,
        "message": {
            "en": "Please complete the captcha again.",
            "es": "Por favor, complete el captcha nuevamente.",
            "ja": "再度キャプチャを完了してください。"
        }
    },
    113: {
        "status": 500,
        "message": {
            "en": "We had an error processing your captcha, please try again later.",
            "es": "Tuvimos un error al procesar tu captcha, por favor inténtalo nuevamente más tarde.",
            "ja": "キャプチャの処理中にエラーが発生しました。後でもう一度お試しください。"
        }
    },
    114: {
        "status": 403,
        "message": {
            "en": "You do not have permission to perform that operation.",
            "es": "No tiene permiso para realizar esa operación.",
            "ja": "その操作を行う権限がありません。"
        }
    },
    115: {
        "status": 429,
        "message": {
            "en": "You are making too many requests, please try again later.",
            "es": "Estás realizando demasiadas solicitudes, inténtalo de nuevo más tarde.",
            "ja": "リクエストが多すぎます。後でもう一度お試しください。"
        }
    },
    116: {
        "status": 405,
        "message": {
            "en": "The endpoint is disabled.",
            "es": "El endpoint está desactivado.",
            "ja": "エンドポイントは無効になっています。"
        }
    },
    117: {
        "status": 405,
        "message": {
            "en": "The path is disabled.",
            "es": "La ruta está desactivada.",
            "ja": "パスは無効になっています。"
        }
    },
    1000: {
        "status": 401,
        "message": {
            "en": "The username o password are incorrect. Try again.",
            "es": "El nombre de usuario o la contraseña son incorrectos. Intentalo de nuevo.",
            "ja": "ユーザー名またはパスワードが正しくありません。再試行してください。"
        }
    },
    1001: {
        "status": 422,
        "message": {
            "en": "Account is scheduled for deletion, you must cancel it before logging in.",
            "es": "La cuenta está programada para ser eliminada, debes cancelarla antes de iniciar sesión.",
            "ja": "アカウントは削除予定です。ログインする前にキャンセルする必要があります。"
        }
    },
    1002: {
        "status": 409,
        "message": {
            "en": "Account is scheduled for deletion, you must cancel it before logging in.",
            "es": "La cuenta está programada para ser eliminada, debes cancelarla antes de iniciar sesión.",
            "ja": "アカウントは削除予定です。ログインする前にキャンセルする必要があります。"
        }
    },
    1003: {
        "status": 403,
        "message": {
            "en": "You need to verify your email before logging into your account.",
            "es": "Necesita verificar su correo electrónico antes de iniciar sesión en su cuenta.",
            "ja": "アカウントにログインする前にメールアドレスを確認する必要があります。"
        }
    },
    1004: {
        "status": 409,
        "message": {
            "en": "The account was deleted.",
            "es": "La cuenta fue eliminada.",
            "ja": "アカウントは削除されました。"
        }
    },
    1005: {
        "status": 403,
        "message": {
            "en": "Your account is banned.",
            "es": "Tu cuenta esta suspendida.",
            "ja": "あなたのアカウントは停止されています。"
        }
    },
    1006: {
        "status": 451,
        "message": {
            "en": "Your account is banned for legal reasons.",
            "es": "Tu cuenta esta suspendida por razones legales.",
            "ja": "法的な理由により、あなたのアカウントは停止されています。"
        }
    },
    1007: {
        "status": 409,
        "message": {
            "en": "You have already been authenticated.",
            "es": "Ya has sido autenticado.",
            "ja": "あなたは既に認証されています。"
        }
    },
    1008: {
        "status": 403,
        "message": {
            "en": "You are not old enough to register.",
            "es": "No tienes edad suficiente para registrarte.",
            "ja": "登録するのに十分な年齢ではありません。"
        }
    },
    1009: {
        "status": 401,
        "message": {
            "en": "You must log in to do that.",
            "es": "Debes iniciar sesión para hacer eso.",
            "ja": "それを行うにはログインする必要があります。"
        }
    },
    1010: {
        "status": 403,
        "message": {
            "en": "You can not do that.",
            "es": "No puedes hacer eso.",
            "ja": "それを行うことはできません。"
        }
    },
    1011: {
        "status": 201,
        "message": {
            "en": "Account created successfully.",
            "es": "Cuenta creada con éxito.",
            "ja": "アカウントが正常に作成されました。"
        }
    },
    1012: {
        "status": 201,
        "message": {
            "en": "Account created successfully but you need to verify your email before logging into your account.",
            "es": "Cuenta creada con éxito pero necesitas verificar tu correo electrónico antes de iniciar sesión en su cuenta.",
            "ja": "アカウントが正常に作成されましたが、アカウントにログインする前にメールアドレスを確認する必要があります。"
        }
    },
    1013: {
        "status": 401,
        "message": {
            "en": "The token is invalid.",
            "es": "El token no es válido.",
            "ja": "トークンが無効です。"
        }
    },
    1014: {
        "status": 401,
        "message": {
            "en": "The token schema is invalid.",
            "es": "El esquema del token no es válido.",
            "ja": "トークンのスキーマが無効です。"
        }
    },
    1015: {
        "status": 401,
        "message": {
            "en": "The token is expired.",
            "es": "El token esta caducado.",
            "ja": "トークンの有効期限が切れています。"
        }
    },
    1016: {
        "status": 401,
        "message": {
            "en": "The token is valid but must be used later.",
            "es": "El token es válido pero debe usarse más tarde.",
            "ja": "トークンは有効ですが、後で使用する必要があります。"
        }
    },
    1017: {
        "status": 422,
        "message": {
            "en": "The code is invalid.",
            "es": "El code no es válido.",
            "ja": "コードが無効です。"
        }
    },
    1018: {
        "status": 422,
        "message": {
            "en": "The email is not in use.",
            "es": "El correo electrónico no está en uso.",
            "ja": "このメールアドレスは使用されていません。"
        }
    },
    1019: {
        "status": 403,
        "message": {
            "en": "You can not do that due to your account status.",
            "es": "No puede hacer eso debido al estado de su cuenta.",
            "ja": "アカウントの状態により、その操作を行うことはできません。"
        }
    },
    1020: {
        "status": 422,
        "message": {
            "en": "The code is expired.",
            "es": "El code esta caducado.",
            "ja": "コードの有効期限が切れています。"
        }
    },
    1021: {
        "status": 422,
        "message": {
            "en": "The code is valid but must be used later.",
            "es": "El code es válido pero debe usarse más tarde.",
            "ja": "コードは有効ですが、後で使用する必要があります。"
        }
    },
    1022: {
        "status": 200,
        "message": {
            "en": "Email successfully verified.",
            "es": "Correo electrónico verificado exitosamente.",
            "ja": "メールが正常に確認されました。"
        }
    },
    1023: {
        "status": 200,
        "message": {
            "en": "You have successfully logged in.",
            "es": "Se ha iniciado sesión correctamente.",
            "ja": "正常にログインしました。"
        }
    },
    1024: {
        "status": 200,
        "message": {
            "en": "You canceled the scheduled deletion and logged in successfully.",
            "es": "Cancelaste la eliminación programada e iniciaste sesión correctamente.",
            "ja": "予定されていた削除をキャンセルし、正常にログインしました。"
        }
    },
    1025: {
        "status": 200,
        "message": {
            "en": "The code has been sent, please check your email.",
            "es": "El código ha sido enviado, por favor revisa tu correo electrónico.",
            "ja": "コードが送信されましたので、メールをご確認ください。"
        }
    },
    1026: {
        "status": 200,
        "message": {
            "en": "The password has been reset successfully.",
            "es": "La contraseña se ha restablecido correctamente.",
            "ja": "パスワードが正常にリセットされました。"
        }
    },
    1027: {
        "status": 451,
        "message": {
            "es": "No tienes edad mínima legal para registrarte.",
            "en": "You do not meet the legal minimum age to register.",
            "ja": "登録するための法定最低年齢を満たしていません。"
        }
    },
    2000: {
        "status": 200,
        "message": {
            "en": "User successfully retrieved.",
            "es": "Usuario obtenido exitosamente.",
            "ja": "ユーザー情報が正常に取得されました。"
        }
    },
    2001: {
        "status": 404,
        "message": {
            "en": "User not found.",
            "es": "Usuario no encontrado.",
            "ja": "ユーザーが見つかりません。"
        }
    },
    2002: {
        "status": 401,
        "message": {
            "en": "You must log in before viewing your profile.",
            "es": "Debes iniciar sesión antes de ver tu perfil.",
            "ja": "プロフィールを見る前にログインする必要があります。"
        }
    },
    2003: {
        "status": 422,
        "message": {
            "en": "The username must be between 3 and 32 in length and contain characters A to Z (except dots and underscores).",
            "es": "El nombre de usuario debe tener entre 3 y 32 de longitud y contener caracteres de la A a la Z (excepto puntos y guiones bajos).",
            "ja": "ユーザー名は3から32の長さで、AからZの文字（ピリオドとアンダースコアを除く）を含む必要があります。"
        }
    },
    2004: {
        "status": 422,
        "message": {
            "en": "The password must be between 4 and 64 in length.",
            "es": "La contraseña debe tener entre 4 y 64 de longitud.",
            "ja": "パスワードは4から64の長さである必要があります。"
        }
    },
    2005: {
        "status": 409,
        "message": {
            "en": "The new password can not be the same as the previous one.",
            "es": "La nueva contraseña no puede ser la misma que la anterior.",
            "ja": "新しいパスワードは前のパスワードと同じであってはなりません。"
        }
    },
    2006: {
        "status": 200,
        "message": {
            "en": "Your account is scheduled to be deleted within a month.",
            "es": "Se programó la eliminación de su cuenta dentro de un mes.",
            "ja": "アカウントは1ヶ月以内に削除される予定です。"
        }
    },
    2007: {
        "status": 422,
        "message": {
            "en": "The email is invalid.",
            "es": "El correo electrónico no es válido.",
            "ja": "メールアドレスが無効です。"
        }
    },
    2008: {
        "status": 409,
        "message": {
            "en": "The username is already in use.",
            "es": "El nombre de usuario ya está en uso.",
            "ja": "そのユーザー名は既に使用されています。"
        }
    },
    2009: {
        "status": 409,
        "message": {
            "en": "The email is already in use.",
            "es": "El correo electrónico ya está en uso.",
            "ja": "そのメールアドレスは既に使用されています。"
        }
    },
    2010: {
        "status": 401,
        "message": {
            "en": "The password is incorrect. Try again.",
            "es": "La contraseña es incorrecta. Intentalo de nuevo.",
            "ja": "パスワードが正しくありません。もう一度お試しください。"
        }
    },
    2011: {
        "status": 422,
        "message": {
            "en": "The display name must be between 2 and 32 in length.",
            "es": "El nombre a mostrar debe tener entre 2 y 32 de longitud.",
            "ja": "表示されるユーザー名は2から32の長さである必要があります。"
        }
    },
    2012: {
        "status": 422,
        "message": {
            "en": "The description must be less than 2000 in length.",
            "es": "La descripción debe tener una longitud inferior a 2000.",
            "ja": "説明は2000文字未満でなければなりません。"
        }
    },
    2013: {
        "status": 422,
        "message": {
            "en": "The last name must be less than 60 in length.",
            "es": "La apellido debe tener una longitud inferior a 60.",
            "ja": "姓は60文字未満でなければなりません。"
        }
    },
    2014: {
        "status": 422,
        "message": {
            "en": "The first name must be less than 60 in length.",
            "es": "La nombre debe tener una longitud inferior a 60.",
            "ja": "名は60文字未満でなければなりません。"
        }
    },
    2015: {
        "status": 400,
        "message": {
            "en": "The language is invalid.",
            "es": "El idioma no es válido.",
            "ja": "言語が無効です。"
        }
    },
    2016: {
        "status": 406,
        "message": {
            "en": "Language is not available.",
            "es": "El idioma no está disponible.",
            "ja": "言語が利用できません。"
        }
    },
    2017: {
        "status": 400,
        "message": {
            "en": "The image is invalid.",
            "es": "La imagen no es válida.",
            "ja": "画像が無効です。"
        }
    },
    2018: {
        "status": 409,
        "message": {
            "en": "You have blocked the user.",
            "es": "Has bloqueado al usuario.",
            "ja": "あなたはそのユーザーをブロックしました。"
        }
    },
    2019: {
        "status": 409,
        "message": {
            "en": "You have already sent the friend request.",
            "es": "Ya enviaste la solicitud de amistad.",
            "ja": "すでに友達リクエストを送信しています。"
        }
    },
    2020: {
        "status": 409,
        "message": {
            "en": "You are already friends.",
            "es": "Ustedes ya son amigos.",
            "ja": "あなたたちはすでに友達です。"
        }
    },
    2021: {
        "status": 200,
        "message": {
            "en": "Your profile has been updated.",
            "es": "Tu perfil se ha actualizado.",
            "ja": "あなたのプロフィールは更新されました。"
        }
    },
    2022: {
        "status": 200,
        "message": {
            "en": "Friend request sent.",
            "es": "Solicitud de amistad enviada.",
            "ja": "友達リクエストが送信されました。"
        }
    },
    2023: {
        "status": 200,
        "message": {
            "en": "Friend request accepted.",
            "es": "Solicitud de amistad aceptada.",
            "ja": "友達リクエストが承認されました。"
        }
    },
    2024: {
        "status": 409,
        "message": {
            "en": "You are not friends.",
            "es": "Ustedes no son amigos.",
            "ja": "あなたたちは友達ではありません。"
        }
    },
    2025: {
        "status": 200,
        "message": {
            "en": "Friend removed.",
            "es": "Amigo eliminado.",
            "ja": "友達が削除されました。"
        }
    },
    2026: {
        "status": 404,
        "message": {
            "en": "The friend request does not exist.",
            "es": "La solicitud de amistad no existe.",
            "ja": "友達リクエストが存在しません。"
        }
    },
    2027: {
        "status": 200,
        "message": {
            "en": "Friend request cancelled.",
            "es": "Solicitud de amistad cancelada.",
            "ja": "友達申請がキャンセルされました。"
        }
    },
    2028: {
        "status": 200,
        "message": {
            "en": "Friend request rejected.",
            "es": "Solicitud de amistad rechazada.",
            "ja": "あなたは友達リクエストを拒否しました。"
        }
    },
    2029: {
        "status": 409,
        "message": {
            "en": "You have already blocked the user.",
            "es": "Ya has bloqueado al usuario.",
            "ja": "既にそのユーザーをブロックしています。"
        }
    },
    2030: {
        "status": 200,
        "message": {
            "en": "User successfully blocked.",
            "es": "Usuario bloqueado con éxito.",
            "ja": "ユーザーのブロックに成功しました。"
        }
    },
    2031: {
        "status": 409,
        "message": {
            "en": "The user is not blocked.",
            "es": "El usuario no esta bloqueado.",
            "ja": "ユーザーはブロックされていません。"
        }
    },
    2032: {
        "status": 200,
        "message": {
            "en": "User successfully unblocked.",
            "es": "Usuario desbloqueado con éxito.",
            "ja": "ユーザーのブロックが正常に解除されました。"
        }
    },
    2033: {
        "status": 409,
        "message": {
            "en": "You can not do that to yourself.",
            "es": "No puedes hacer eso contigo mismo.",
            "ja": "自分自身に対してはできません。"
        }
    },
    2034: {
        "status": 400,
        "message": {
            "en": "Invalid relationship type.",
            "es": "Tipo de relación no válida.",
            "ja": "無効な関係タイプです。"
        }
    },
    2035: {
        "status": 403,
        "message": {
            "en": "You are blocked by the user.",
            "es": "Estas bloqueado por el usuario.",
            "ja": "ユーザーによってブロックされています。"
        }
    },
    2036: {
        "status": 409,
        "message": {
            "en": "Your date of birth cannot be older than the current date.",
            "es": "Su fecha de nacimiento no puede ser anterior a la fecha actual.",
            "ja": "誕生日は現在の日付よりも前にすることはできません。"
        }
    },
    2037: {
        "status": 403,
        "message": {
            "en": "You can not change your username because you need to wait a month.",
            "es": "No puedes cambiar tu nombre de usuario porque necesitas esperar un mes.",
            "ja": "ユーザー名を変更できません。1か月待つ必要があります。"
        }
    },
    2038: {
        "status": 410,
        "message": {
            "en": "The user was deleted.",
            "es": "El usuario fue eliminado.",
            "ja": "ユーザーは削除されました。"
        }
    },
    2039: {
        "status": 403,
        "message": {
            "en": "The user was banned.",
            "es": "El usuario fue suspendido.",
            "ja": "ユーザーは禁止されました。"
        }
    },
    2040: {
        "status": 200,
        "message": {
            "en": "Users successfully retrieved.",
            "es": "Usuarios obtenidos exitosamente.",
            "ja": "ユーザー情報が正常に取得されました。"
        }
    },
    2041: {
        "status": 406,
        "message": {
            "en": "Theme is not available.",
            "es": "El tema visual no está disponible.",
            "ja": "テーマは利用できません。"
        }
    },
    2042: {
        "status": 403,
        "message": {
            "en": "You cannot change your birthdate because you can only be born once. If there is an error with your birthdate, please contact technical support.",
            "es": "No puedes cambiar tu fecha de cumpleaños porque solo puedes nacer una vez. Si hay algún error con tu fecha de cumpleaños, contacta con el soporte técnico.",
            "ja": "誕生日は一度しか生まれないため、変更できません。誕生日にエラーがある場合は、技術サポートに連絡してください。"
        }
    },
    2043: {
        "status": 200,
        "message": {
            "en": "User successfully deleted.",
            "es": "Usuario eliminado con éxito.",
            "ja": "ユーザーが正常に削除されました。"
        }
    },
    2044: {
        "status": 200,
        "message": {
            "en": "Inbox successfully retrieved.",
            "es": "Bandeja de entrada obtenida exitosamente.",
            "ja": "受信箱が正常に取得されました。"
        }
    },
    2045: {
        "status": 200,
        "message": {
            "en": "Inbox successfully updated.",
            "es": "Bandeja de entrada actualizada correctamente.",
            "ja": "受信箱が正常に更新されました。"
        }
    },
    2046: {
        "status": 409,
        "message": {
            "en": "You cannot mark more notifications as read than exist.",
            "es": "No puedes marcar como leídas más notificaciones que las que existen.",
            "ja": "存在する以上の通知を既読にすることはできません。"
        }
    },
    3000: {
        "status": 200,
        "message": {
            "en": "Post successfully retrieved.",
            "es": "Publicación obtenida exitosamente.",
            "ja": "投稿が正常に取得されました。"
        }
    },
    3001: {
        "status": 200,
        "message": {
            "en": "Posts successfully retrieved.",
            "es": "Publicaciones obtenidas exitosamente.",
            "ja": "投稿が正常に取得されました。"
        }
    },
    3002: {
        "status": 404,
        "message": {
            "en": "Post not found.",
            "es": "Publicación no encontrada.",
            "ja": "投稿が見つかりません。"
        }
    },
    3003: {
        "status": 410,
        "message": {
            "en": "The post was deleted.",
            "es": "La publicación fue eliminada.",
            "ja": "投稿は削除されました。"
        }
    },
    3004: {
        "status": 403,
        "message": {
            "en": "The post is hidden.",
            "es": "La publicación está oculta.",
            "ja": "投稿は非表示です。"
        }
    },
    3005: {
        "status": 451,
        "message": {
            "en": "The publication is censored.",
            "es": "La publicación está censurada.",
            "ja": "この投稿は法的な理由で検閲されています。"
        }
    },
    3006: {
        "status": 200,
        "message": {
            "en": "Post successfully deleted.",
            "es": "Publicación eliminada con éxito.",
            "ja": "投稿が正常に削除されました。"
        }
    },
    3007: {
        "status": 422,
        "message": {
            "en": "The title must be between 3 and 32 in length.",
            "es": "El titulo debe tener entre 3 y 32 de longitud.",
            "ja": "タイトルの長さは3から32の間でなければなりません。"
        }
    },
    3008: {
        "status": 422,
        "message": {
            "en": "The content must be between 5 and 3000 in length.",
            "es": "El contendio debe tener entre 5 y 32 de longitud.",
            "ja": "内容の長さは5から3000の間でなければなりません。"
        }
    },
    3009: {
        "status": 404,
        "message": {
            "en": "The post you are trying to reply to does not exist.",
            "es": "La publicación a la que intentas responder no existe.",
            "ja": "返信しようとしている投稿は存在しません。"
        }
    },
    3010: {
        "status": 201,
        "message": {
            "en": "Post successfully created.",
            "es": "Publicación creada exitosamente.",
            "ja": "投稿が正常に作成されました。"
        }
    },
    3011: {
        "status": 200,
        "message": {
            "en": "Post successfully updated.",
            "es": "Publicación modificada exitosamente.",
            "ja": "投稿が正常に更新されました。"
        }
    },
    3012: {
        "status": 200,
        "message": {
            "en": "Opinions of the post successfully retrieved.",
            "es": "Opiniones de la publicación obtenidas exitosamente.",
            "ja": "投稿の意見が正常に取得されました。"
        }
    },
    3013: {
        "status": 403,
        "message": {
            "en": "The post you are trying to reply to does was hidden.",
            "es": "La publicación a la que intentas responder fue ocultado.",
            "ja": "返信しようとしている投稿は非表示にされました。"
        }
    },
    3014: {
        "status": 403,
        "message": {
            "en": "The post you are trying to reply to was deleted.",
            "es": "La publicación a la que intentas responder fue eliminado.",
            "ja": "返信しようとしている投稿は削除されました。"
        }
    },
    4000: {
        "status": 200,
        "message": {
            "en": "Chat successfully retrieved.",
            "es": "Chat obtenido exitosamente.",
            "ja": "チャットが正常に取得されました。"
        }
    },
    4001: {
        "status": 200,
        "message": {
            "en": "Chats successfully retrieved.",
            "es": "Chats obtenidos exitosamente.",
            "ja": "チャットが正常に取得されました。"
        }
    },
    4002: {
        "status": 404,
        "message": {
            "en": "Chat not found.",
            "es": "Chat no encontrado.",
            "ja": "チャットが見つかりません。"
        }
    },
    4003: {
        "status": 403,
        "message": {
            "en": "The chat is hidden.",
            "es": "El chat está oculto.",
            "ja": "チャットは非表示にされています。"
        }
    },
    4004: {
        "status": 451,
        "message": {
            "en": "The chat is censored.",
            "es": "El chat está censurado.",
            "ja": "チャットは法的な理由で検閲されています。"
        }
    },
    4005: {
        "status": 200,
        "message": {
            "en": "Chat successfully updated.",
            "es": "El chat se actualizó con éxito.",
            "ja": "チャットが正常に更新されました。"
        }
    },
    4006: {
        "status": 201,
        "message": {
            "en": "Chat successfully created.",
            "es": "Chat creado exitosamente.",
            "ja": "チャットが正常に作成されました。"
        }
    },
    4007: {
        "status": 404,
        "message": {
            "en": "The user you are trying to message to does not exist.",
            "es": "El usuario al que estás intentando escribir no existe.",
            "ja": "メッセージを送ろうとしているユーザーは存在しません。"
        }
    },
    4008: {
        "status": 403,
        "message": {
            "en": "The user you are trying to message to was banned.",
            "es": "El usuario al que estás intentando escribir fue suspendido.",
            "ja": "メッセージを送ろうとしているユーザーは禁止されています。"
        }
    },
    4009: {
        "status": 403,
        "message": {
            "en": "The user you are trying to message to was deleted.",
            "es": "El usuario al que estás intentando escribir fue eliminado.",
            "ja": "メッセージを送ろうとしているユーザーは削除されました。"
        }
    },
    4010: {
        "status": 403,
        "message": {
            "en": "The user you are trying to message to is not your friend.",
            "es": "El usuario al que estás intentando escribir no es tu amigo.",
            "ja": "メッセージを送ろうとしているユーザーはあなたの友達ではありません。"
        }
    },
    4011: {
        "status": 409,
        "message": {
            "en": "You can not send a message to yourself.",
            "es": "No puedes enviarte un mensaje a ti mismo.",
            "ja": "自分にメッセージを送ることはできません。"
        }
    },
    4012: {
        "status": 409,
        "message": {
            "en": "You cannot mark more messages as read than exist.",
            "es": "No puedes marcar más mensajes como leídos de los que existen.",
            "ja": "存在する以上のメッセージを既読にすることはできません。"
        }
    },
    4013: {
        "status": 200,
        "message": {
            "en": "Message successfully retrieved.",
            "es": "Mensaje obtenido exitosamente.",
            "ja": "メッセージが正常に取得されました。"
        }
    },
    4014: {
        "status": 200,
        "message": {
            "en": "Messages successfully retrieved.",
            "es": "Mensajes obtenidos exitosamente.",
            "ja": "メッセージが正常に取得されました。"
        }
    },
    4015: {
        "status": 404,
        "message": {
            "en": "Message not found.",
            "es": "Mensaje no encontrado.",
            "ja": "メッセージが見つかりません。"
        }
    },
    4016: {
        "status": 200,
        "message": {
            "en": "Message successfully updated.",
            "es": "El mensaje se actualizó con éxito.",
            "ja": "メッセージが正常に更新されました。"
        }
    },
    4017: {
        "status": 201,
        "message": {
            "en": "Message successfully created.",
            "es": "Mensaje creado exitosamente.",
            "ja": "メッセージが正常に作成されました。"
        }
    },
    4018: {
        "status": 200,
        "message": {
            "en": "Message successfully deleted.",
            "es": "Mensaje eliminada con éxito.",
            "ja": "メッセージが正常に削除されました。"
        }
    },
    4019: {
        "status": 403,
        "message": {
            "en": "You can only attach a maximum of 4 files per message.",
            "es": "Sólo puedes adjuntar un máximo de 4 archivos por mensaje.",
            "ja": "メッセージごとに最大4つのファイルしか添付できません。"
        }
    },
    4020: {
        "status": 422,
        "message": {
            "en": "The attachment is not valid.",
            "es": "El archivo adjunto no es válido.",
            "ja": "添付ファイルが無効です。"
        }
    },
    4021: {
        "status": 422,
        "message": {
            "en": "The message must be between 1 and 2000 in length.",
            "es": "El mensaje debe tener entre 1 y 2000 de longitud.",
            "ja": "メッセージの長さは1から2000の間でなければなりません。"
        }
    },
    4022: {
        "status": 409,
        "message": {
            "en": "The message you are trying to reply to does not exist.",
            "es": "El mensaje que intentas responder no existe.",
            "ja": "返信しようとしているメッセージは存在しません。"
        }
    }
};