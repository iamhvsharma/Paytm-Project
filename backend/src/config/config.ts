export interface Config {
  PORT: number;
  MONGODB_URI: string;
  CORS_ORIGIN: string;
  JWT_SECRET: string;
}

export const config: Config = {
  PORT: parseInt(process.env.PORT || "3000"),
  MONGODB_URI: process.env.MONGODB_URI || "missing Mongo DB URI",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "missing cors origin",
  JWT_SECRET: process.env.JWT_SECRET || "missing jwt secret",
};
