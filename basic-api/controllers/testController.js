const { BotFrameworkAdapter } = require('botbuilder');

const Bot = require('../../hackaton-best-inteligencia/nlp.js/examples/console-bot/index');

const adapter = new BotFrameworkAdapter();
const bot = new Bot();

adapter.onTurnError = async (context) => {
  await context.sendActivity('Oops');
};

function test(req, context) {
  bot.bot.onTurn(context);
  console.log('lkjdsaf');
  console.log(req);
}

module.exports = {
  test,
};
