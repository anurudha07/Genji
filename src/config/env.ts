import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT || "5001",
  MONGO_URI: process.env.MONGO_URI || "",
  SECRET_TOKEN: process.env.SECRET_TOKEN || "secret",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Validate 
const required: (keyof typeof env)[] = ["MONGO_URI", "SECRET_TOKEN", "PORT", "NODE_ENV"];
for (const key of required) {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export default env;