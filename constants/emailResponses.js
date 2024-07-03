module.exports = Object.freeze({
    REGISTER: {
        from: "example@example.com",
        subject: "Email verification",
        html: "<h1>Please verify your account</h1><br><p>Click this link to verify your account: http://example.xyz/verifycode=%CODE%</p>",
    },
    PASSWORD_RESET: {
        from: "example@example.com",
        subject: "Email verification",
        html: "<h1>Please use this link to reset your password</h1><br><p>Click this link to verify your account: http://example.xyz/verifycode=%CODE%</p>",
    },
    EMAIL_CHANGED: {
        from: "example@example.com",
        subject: "Email verification",
        html: "<h1>Please verify your account</h1><br><p>Click this link to verify your account: http://example.xyz/verifycode=%CODE%</p>",
    }
});