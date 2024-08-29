const config: {
  MONGO_URI: string;
  JWT_SECRET: string;
} = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export default config;