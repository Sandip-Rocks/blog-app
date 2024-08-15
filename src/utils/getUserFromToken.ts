import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtSignature =
  process.env.JWT_SIGNATURE ||
  "random_secret_a49369f3-2453-4bab-83d0-cf3746ddd765";

export const generateToken = (id: number) => {
  return jwt.sign(
    {
      userId: id,
    },
    jwtSignature,
    {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    }
  );
};

export const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSignature) as {
      userId: number;
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
