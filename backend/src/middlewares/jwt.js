import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_WORD || 'default_secret';

export const createToken = (user) => {
  const payload = { name: user.name, email: user.email };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
