import 'dotenv/config';

const config = {
  secret: process.env.JWT_SECRET || 'batata',
};

export default config;
