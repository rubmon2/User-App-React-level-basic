import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const useSequelizze = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  },
);

export const conectDB = async () => {
  try {
    await useSequelizze.authenticate();
    await useSequelizze.sync();
    console.log('db is conect');
  } catch (error) {
    console.log(error);
  }
};
