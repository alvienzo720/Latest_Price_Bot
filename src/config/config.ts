import "dotenv/config";

export const BotParams = {
  BOT_KEY: process.env.BOT_KEY || "",
  WHITELISTED_USERS: [541365365],
  TELEGRAM_DELETE_MESSAGE_INTERVAL: 10,
  API_KEY: process.env.API_KEY || "",
  API_URL: process.env.API_URL || "",
};
