import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { REST, Routes } from 'discord.js';

const SUPPORTED_COMMAND_KEYS = {
  Ping: 'ping',
};

const BOT_COMMANDS = [
  {
    name: SUPPORTED_COMMAND_KEYS.Ping,
    description: 'Replies with Pong!',
  },
];

const DiscordClient = new REST({ version: '10' }).setToken('');

const app = new Hono();

app.get('/', async (c) => {
  try {
    console.log('Started refreshing application (/) commands.');

    await DiscordClient.put(Routes.applicationCommands(''), {
      body: BOT_COMMANDS,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
