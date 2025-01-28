import { Sequelize } from 'sequelize';
import { userModel } from '../models/user.schema.js';
import { savePass, verifyPass } from '../middlewares/hash.js';
import { createToken } from '../middlewares/jwt.js';

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(404).json({ message: 'Complete all field' });
      return;
    }

    const hashPassword = await savePass(password);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const payload = { name: user.name, email: user.email };

    res.status(201).json(payload);
  } catch (error) {
    console.log(error);

    if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(500).json({
        message: 'User already exists',
        details: error.errors,
      });
      return;
    }

    //otros errores
    res.status(500).json({ message: 'Internal error server, pls try later' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Complete all field' });
      return;
    }
    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).json({ message: 'User not found or not exist' });
      return;
    }
    const isMatch = await verifyPass(password, user.password);
    if (!isMatch) {
      res.status(404).json({ message: 'User not found or not exist' });
      return;
    }
    const payload = { name: user.name, email: user.email };
    const token = createToken(payload);
    if (!token) {
      res
        .status(400)
        .json({ message: 'Cannot create authorization with this user' });
      return;
    }
    res.status(200).json(token);
  } catch (error) {
    console.log(error);

    //otros errores
    res.status(500).json({ message: 'Internal error server, pls try later' });
  }
};

export const profileUser = async (req, res) => {
  const header = req.user;
  const { name, email } = header;

  try {
    if (!name || !email) {
      res
        .status(401)
        .json({ message: 'Pls come back to login, you need authorization' });
      return;
    }

    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
      res
        .status(404)
        .json({ message: 'User not found, you havent authorization' });
      return;
    }
    const payload = { email: user.email, name: user.name };
    res.status(202).json(payload);
  } catch (error) {
    console.log(error);

    //otros errores
    res.status(500).json({ message: 'Internal error server,plst try later' });
  }
};

export const logoutUSer = async (req, res) => {
  try {
    res.status(200).json({ message: 'Good bye' });
  } catch (error) {
    console.log(error);

    //otros errores
    res.status(500).json({ message: 'Internal error server, pls try later' });
  }
};
