import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const AuthenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    console.log(user);
    next();
  });
}

export default AuthenticateToken;
