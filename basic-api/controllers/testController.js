const { BotFrameworkAdapter } = require('botbuilder');

const Bot = require('../../hackaton-best-inteligencia/nlp.js/examples/console-bot/index');
const testData = require('../models/testModel');

const adapter = new BotFrameworkAdapter();
const bot = new Bot();

adapter.onTurnError = async (context) => {
  await context.sendActivity('Oops');
};

function postTest(req, context) {
  bot.onTurn(context);
  if (req != null) {
    testData.save();
  }
  console.log(context);
  console.log('lkjdsaf');
  console.log(req);
}

function getTest(req, res) {
  testData.find({}, (data) => {
    if (data != null) {
      return res.status(200).send({ message: [data] });
    }
    return res.status(404).send({ message: "no hay datos" + data});
  });
}

module.exports = {
  postTest,
  getTest,
};
