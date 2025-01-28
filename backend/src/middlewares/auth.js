import { verifyToken } from './jwt.js';

export const authenticate = async (req, res, next) => {
  const header = req.headers['authorization'];
  try {
    if (!header) {
      res.status(401).json({ message: 'Need authorization' });
      return;
    }
    const [prefix, token] = header.trim().replace(/['"]+/g, '').split(' ');

    if (prefix !== 'Bearer' || !token) {
      res.status(401).json({ message: 'Need Authorization' });
      return;
    }

    const decodded = verifyToken(token);
    req.user = decodded;
    next();
  } catch (error) {
    console.log(error);
  }
};
