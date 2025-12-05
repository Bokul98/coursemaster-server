import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT || 5000,
  db_uri: process.env.DB_URI,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expires_in: "15m",
  refresh_token_expires_in: "7d",
  imgbb_api_key: process.env.IMGBB_API_KEY || ''
};
