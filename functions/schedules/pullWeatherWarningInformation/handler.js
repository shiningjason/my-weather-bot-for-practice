'use strict';

const fetch = require('node-fetch');
const moment = require('moment');

const getWeather = require('../../../lib/functions/getWeather');
const saveWeather = require('../../../lib/functions/saveWeather');
const checkResponseStatus = require('../../../lib/shared/checkResponseStatus');
const formatXML = require('../../../lib/shared/formatXML');

const urls = {
  en: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
  'zh-TW': 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
  'zh-CN': 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};

module.exports.handler = function(event, context) {
  // getWeather(`hongkong-warning-en`)
  //   .then((value) => value.date);
  const promises = Object.keys(urls)
    .map((key) =>
      fetch(urls[key])
        .then(checkResponseStatus)
        .then((res) => res.text())
        .then(parseWeatherWarning)
        .then(saveWeather(`hongkong-warning-${key}`))
        .catch((err) => console.log(`Error occurred when fetch weather warning ${key}:\n${err}`)));

  Promise.all(promises)
    .then(() => {
      console.log('Pull weather warning infomation successfully.');
      context.succeed({ ok: 'ok' });
    })
    .catch(context.fail);
};

function parseWeatherWarning(input) {
  return {
    content: parseWarningContent(input),
    date: parseWarningDate(input)
  };
}

function parseWarningContent(input) {
  const matches = /<description><!\[CDATA\[(.*)\]\]><\/description>/g.exec(input);
  if (!matches || matches.length !== 2) throw new Error(`Invalid format of weather warning format:\n${input}`);
  return formatXML(matches[1]);
}

function parseWarningDate(input) {
  const matches = /<pubDate>(.*)<\/pubDate>/g.exec(input);
  if (!matches || matches.length !== 2) throw new Error(`Invalid format of weather warning format:\n${input}`);
  return moment(matches[1], 'ddd, D MMM YYYY H:m:s Z').valueOf();
}
