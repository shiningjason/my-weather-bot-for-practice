'use strict';

const fetch = require('node-fetch');

const saveWeather = require('../../../lib/functions/saveWeather');
const checkResponseStatus = require('../../../lib/shared/checkResponseStatus');
const formatXML = require('../../../lib/shared/formatXML');

const urls = {
  en: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
  'zh-TW': 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
  'zh-CN': 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};

module.exports.handler = function(event, context) {
  const promises = Object.keys(urls)
    .map((key) =>
      fetch(urls[key])
        .then(checkResponseStatus)
        .then((res) => res.text())
        .then(parseCurrentWeather)
        .then(saveWeather(`hongkong-current-${key}`))
        .catch((err) => console.log(`Error occurred when fetch current weather ${key}:\n${err}`)));

  Promise.all(promises)
    .then(() => {
      console.log('Pull current weather report successfully.');
      context.succeed({ ok: 'ok' });
    })
    .catch(context.fail);
};

function parseCurrentWeather(input) {
  return {
    content: parseWeatherContent(input),
    date: parseWeatherDate(input)
  };
}

function parseWeatherContent(input) {
  const chunks = input.split('<p>');
  if (!chunks || chunks.length !== 3) throw new Error(`Invalid format of current weather format:\n${input}`);
  return formatXML(chunks[1]);
}

function parseWeatherDate(input) {
  const matches = /<pubDate>(.*)<\/pubDate>/g.exec(input);
  if (!matches || matches.length !== 2) throw new Error(`Invalid format of current weather format:\n${input}`);
  return moment(matches[1], 'ddd, D MMM YYYY H:m:s Z').valueOf();
}
