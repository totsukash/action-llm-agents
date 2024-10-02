import { App } from '@slack/bolt';
import { load } from 'ts-dotenv';

// Load SlackBot tokens and secrets from environment variables
const env = load({
  SLACK_BOT_TOKEN: String,
  SLACK_APP_TOKEN: String,
  SLACK_SIGNING_SECRET: String,
  PORT: Number,
});

// Initialize SlackBot
const app = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET,
  appToken: env.SLACK_APP_TOKEN,
});

console.log("SLACK_BOT_TOKEN", env.SLACK_BOT_TOKEN);

// Send message to SlackBot
app.message('', async ({ message, say }) => {
  if (!message.subtype) {
    await say(`Hello, <@${message.user}>. You said: ${message.text}`);
  }
});

(async () => {
  // Start SlackBot
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();