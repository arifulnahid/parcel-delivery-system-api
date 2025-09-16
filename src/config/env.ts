import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
  DB_URI: string;
}

const loadEnv = (): EnvVars => {
  const requiredEnv: string[] = ["PORT", "NODE_ENV", "DB_URI"];

  requiredEnv.forEach((envVar) => {
    if (!process.env[envVar])
      throw new Error(`Environment Variable ${envVar} Faild to Excecute`);
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DB_URI: process.env.DB_URI as string,
  };
};

export const envVars = loadEnv();
