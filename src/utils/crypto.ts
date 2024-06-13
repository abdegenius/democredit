import jwt from "jsonwebtoken";

const signingAlgorithm = "HS256";

export const generateJwtToken = async <T extends object>(
  data: T,
  secretKey: string,
  expiresIn: string
) => {
  try {
    const token = await jwt.sign(data, secretKey, {
      expiresIn,
      algorithm: signingAlgorithm,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyJwtToken = async <T extends object>(
  token: string,
  secretKey: string
) => {
  try {
    const data = await (<T>(
      jwt.verify(token, secretKey, { algorithms: [signingAlgorithm] })
    ));
    return data;
  } catch (error) {
    throw error;
  }
};
