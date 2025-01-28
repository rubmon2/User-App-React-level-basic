import bcryp from 'bcryptjs';

const SALT_ROUND = 10;

export const savePass = async (data) => {
  return await bcryp.hash(data, SALT_ROUND);
};

export const verifyPass = async (data, hash) => {
  const response = await bcryp.compare(data, hash);
  return response;
};
