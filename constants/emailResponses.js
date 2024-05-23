module.exports = Object.freeze({
    REGISTER: {
        from: "example@example.com",
        subject: "Email verification",
        html: "<h1>Please verify your account</h1><br><p>Click this link to verify your account: http://example.xyz/verifycode=%CODE%</p>",
    }
});