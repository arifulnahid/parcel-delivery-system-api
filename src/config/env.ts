import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
}

const loadEnv = (): EnvVars => {
  const requiredEnv: string[] = ["PORT", "NODE_ENV"];

  requiredEnv.forEach((envVar) => {
    if (!process.env[envVar])
      throw new Error(`Environment Variable ${envVar} Faild to Excecute`);
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnv();
