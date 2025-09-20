import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
  DB_URI: string;
  BCRYPT_SALT_ROUND: number;
  EXPRESS_SESSION_SECRET: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
}

const loadEnv = (): EnvVars => {
  const requiredEnv: string[] = [
    "PORT",
    "NODE_ENV",
    "DB_URI",
    "BCRYPT_SALT_ROUND",
    "EXPRESS_SESSION_SECRET",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
  ];

  requiredEnv.forEach((envVar) => {
    if (!process.env[envVar])
      throw new Error(`Environment Variable ${envVar} Faild to Excecute`);
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DB_URI: process.env.DB_URI as string,
    BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND) as number,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
  };
};

export const envVars = loadEnv();
