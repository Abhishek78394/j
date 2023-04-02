const jwt = require('jsonwebtoken');
const secret = 'secretkey';

const isAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send('Unauthorized');
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

module.exports = { isAuth }   