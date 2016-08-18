const CommandTypes = require('./CommandTypes');
const Constants = require('./Constants');

module.exports = [
  {
    type: CommandTypes.TOPICS,
    val: new RegExp(`^\/topics(?:@${Constants.BOT_NAME})?(?=\\s|$)`)
  },
  {
    type: CommandTypes.TELL_ME,
    val: new RegExp(`^\/tellme(?:@${Constants.BOT_NAME})?\\s(${Constants.topics.CURRENT}|${Constants.topics.WARNING})(?=\\s|$)`),
    format: (topic) => ({ topic })
  },
  {
    type: CommandTypes.SUBSCRIBE,
    val: new RegExp(`^\/subscribe(?:@${Constants.BOT_NAME})?\\s(${Constants.topics.CURRENT}|${Constants.topics.WARNING})(?=\\s|$)`),
    format: (topic) => ({ topic })
  },
  {
    type: CommandTypes.UNSUBSCRIBE,
    val: new RegExp(`^\/unsubscribe(?:@${Constants.BOT_NAME})?\\s(${Constants.topics.CURRENT}|${Constants.topics.WARNING})(?=\\s|$)`),
    format: (topic) => ({ topic })
  },
  {
    type: CommandTypes.CHANGE_LANGUAGE,
    val: new RegExp(`^\/(繁體中文|簡體中文|English)(?:@${Constants.BOT_NAME})?(?=\\s|$)`),
    format: (lang) => ({
      lang: ({
        'English': 'en',
        '繁體中文': 'zh-TW',
        '簡體中文': 'zh-CN'
      })[lang]
    })
  }
];
