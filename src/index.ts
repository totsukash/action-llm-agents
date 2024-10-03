import { App } from '@slack/bolt';
import { load } from 'ts-dotenv';

// Load SlackBot tokens and secrets from environment variables
const env = load({
  SLACK_BOT_TOKEN: String,
  SLACK_APP_TOKEN: String,
  PORT: Number,
});

// Initialize SlackBot
const app = new App({
  token: env.SLACK_BOT_TOKEN,
  appToken: env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event("app_mention", async ({ event, say }) => {
  await say(`Hello, <@${event.user}>!`);
});

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