module.exports = Object.freeze({
    REGISTER: {
        "from": process.env["SMTP_NO_REPLY"],
        "message": {
            "en": {
                "subject": `Email verification.`,
                "html": `<h1>Please verify your account</h1><br><p>Click this link to verify your account: %WEBSITE%/verifycode=%CODE%</p>`
            },
            "es": {
                "subject": `Verificación de correo electronico.`,
                "html": `<h1>Por favor, verifique su cuenta</h1><br><p>Haga clic en este enlace para verificar su cuenta: %WEBSITE%/verifycode=%CODE%</p>`
            },
            "ja": {
                "subject": `メール確認。`,
                "html": `<h1>アカウントを確認してください</h1><br><p>このリンクをクリックしてアカウントを確認してください: %WEBSITE%/verifycode=%CODE%</p>`
            }
        }
    },
    PASSWORD_RESET: {
        "from": process.env["SMTP_NO_REPLY"],
        "message": {
            "en": {
                "subject": `Password reset.`,
                "html": `<h1>Password reset</h1><br><p>Click this link to reset your password: %WEBSITE%/verifycode=%CODE%</p><br><p>If you did not request to reset your password, please ignore this email.</p>`
            },
            "es": {
                "subject": `Restablecimiento de contraseña.`,
                "html": `<h1>Restablecimiento de contraseña.</h1><br><p>Haga clic en este enlace para restablecer su contraseña: %WEBSITE%/verifycode=%CODE%</p><br><p>Si no solicitó restablecer su contraseña, ignore este correo electrónico.</p>`
            },
            "ja": {
                "subject": `パスワードのリセット。`,
                "html": `<h1>パスワードのリセット</h1><br><p>このリンクをクリックしてパスワードをリセットしてください: %WEBSITE%/verifycode=%CODE%</p><br><p>パスワードのリセットをリクエストしていない場合は、このメールを無視してください。</p>`
            }
        }
    },
    EMAIL_CHANGED: {
        "from": process.env["SMTP_NO_REPLY"],
        "message": {
            "en": {
                "subject": `Verify your new email address.`,
                "html": `<h1>Verify your new email address</h1><br><p>Click this link to verify your new email address: %WEBSITE%/verifycode=%CODE%</p>`
            },
            "es": {
                "subject": `Verifique su nueva dirección de correo electrónico.`,
                "html": `<h1>Verifique su nueva dirección de correo electrónico</h1><br><p>Haga clic en este enlace para verificar su nueva dirección de correo electrónico: %WEBSITE%/verifycode=%CODE%</p>`
            },
            "ja": {
                "subject": `新しいメールアドレスを確認してください。`,
                "html": `<h1>新しいメールアドレスを確認してください</h1><br><p>このリンクをクリックして新しいメールアドレスを確認してください: %WEBSITE%/verifycode=%CODE%</p>`
            }
        }
    }
});