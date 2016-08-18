'use strict';

const fetch = require('node-fetch');

const CommandTypes = require('../../lib/CommandTypes');
const Constants = require('../../lib/Constants');
const rules = require('../../lib/rules');
const getLanguage = require('../../lib/functions/getLanguage');
const getTopics = require('../../lib/functions/getTopics');
const getWeather = require('../../lib/functions/getWeather');
const saveLanguage = require('../../lib/functions/saveLanguage');
const subscribe = require('../../lib/functions/subscribe');
const unsubscribe = require('../../lib/functions/unsubscribe');
const checkResponseStatus = require('../../lib/shared/checkResponseStatus');

module.exports.handler = function(event, context) {
  console.log('Event: ', JSON.stringify(event, null, 2));

  const message = event.message;
  const chat = message.chat;
  const user = message.from;
  const text = message.text;

  handleCommand(user.id, text)
    .then((res) => {
      console.log('Response: ', JSON.stringify(res, null, 2));
      if (!res) {
        context.succeed({ ok: 'ok' });
        return;
      }

      fetch(getMethodUrl('sendMessage'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chat.id,
          text: res,
          reply_to_message_id: message.message_id
        })
      })
        .then(checkResponseStatus)
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          context.succeed({ ok: 'ok' });
        })
        .catch((err) => {
          console.log(err);
          context.failed(err);
        });
    })
    .catch((err) => {
      console.log(err);
      context.failed(err);
    });
};

function handleCommand(userId, command) {
  const action = parseCommand(command);
  console.log('Action: ', JSON.stringify(action, null, 2));
  switch (action.type) {
    case CommandTypes.TOPICS:
      return Promise.resolve(getTopics().join(', '));
    case CommandTypes.TELL_ME:
      return getLanguage(userId)
        .then((lang) => getWeather(`hongkong-${action.payload.topic}-${lang}`))
        .then((value) => value.content);
    case CommandTypes.SUBSCRIBE:
      return subscribe(userId, action.payload.topic).then(() => 'OK');
    case CommandTypes.UNSUBSCRIBE:
      return unsubscribe(userId, action.payload.topic).then(() => 'OK');;
    case CommandTypes.CHANGE_LANGUAGE:
      return saveLanguage(userId, action.payload.lang)
        .then(() => ({
          'zh-TW': '知道了',
          'zh-CN': '知道了',
          'en': 'OK'
        }[action.payload.lang]));
  }
}

function parseCommand(command) {
  for (let rule of rules) {
    const matches = command.match(rule.val);
    if (matches) {
      return {
        type: rule.type,
        payload: rule.format && rule.format.apply(rule, matches.slice(1))
      };
    }
  }
}

function getMethodUrl(methodName) {
  return `https://api.telegram.org/bot${Constants.BOT_TOKEN}/${methodName}`;
}
