import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || '3000',
  EGRID_URL: process.env.EGRID_URL || 'https://www.epa.gov/system/files/documents/2023-01/eGRID2021_data.xlsx',
  EGRID_SHEET: process.env.EGRID_SHEET || 'PLNT21',
  IGNORED_HEADER_VALUES: [
    'PSTATABB',
    'Plant state abbreviation',
    'PNAME',
  ],
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : ['http://localhost:5173'], // Default for dev
  API_VERSION: "v1",
  API_KEY: process.env.API_KEY || 'your-secure-key',
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 10, // limit each IP to 100 requests per windowMs
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};