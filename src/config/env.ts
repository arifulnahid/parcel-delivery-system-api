import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
  DB_URI: string;
  BCRYPT_SALT_ROUND: number;
}

const loadEnv = (): EnvVars => {
  const requiredEnv: string[] = [
    "PORT",
    "NODE_ENV",
    "DB_URI",
    "BCRYPT_SALT_ROUND",
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
  };
};

export const envVars = loadEnv();
