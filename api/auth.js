function register(req, res, next) {
    if (!req.body.email) {
        return res.status(400).json({ message: "email is missing" });
    }

    if (!req.body.password) {
        return res.status(400).json({ message: "password is missing" });
    }

    res.json({ token: "xxxxxxx" });
}

module.exports = {
    register,
};
