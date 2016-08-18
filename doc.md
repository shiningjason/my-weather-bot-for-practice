## Telegram

curl https://api.telegram.org/bot231159310:AAFRlim-wRb1L1rVxMo3-5oz9I7t1yE-JUg/setWebhook?url=https://y7srd25ki2.execute-api.ap-northeast-1.amazonaws.com/dev/telegram-webhook

## RSS

1. Current Weather Report
  - https://data.gov.hk/en-data/dataset/hk-hko-rss-current-weather-report
  - (英文) http://rss.weather.gov.hk/rss/CurrentWeather.xml
  - (繁中) http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml
  - (簡中) http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml
2. Weather Warning Infomation
  - https://data.gov.hk/en-data/dataset/hk-hko-rss-weather-warning-information
  - (英文) http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml
  - (繁中) http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml
  - (簡中) http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml

## Scenarios

- [x] List out the topic that our bot support
- [x] Echo back the current info in forecast feed
- [x] Echo back the current info in weather warning
- [x] Subscribe weather warning
- [x] Unsubcribe weather warning
- [x] Change language to Traditional Chinese
- [x] Change language to Simplified Chinese
- [x] Change language to English
- [x] Read current info RSS
- [x] Read weather warning RSS
- [x] Parse current info RSS
- [x] Parse weather warning RSS
- [ ] Observe RSS feed

topics - List out the supported weather topic  
tellme - Echo back the current weather topic  
subscribe - Subscribe the new weather topic  
unsubscribe - Unsubscribe the new weather topic  
繁體中文 - Change language to traditional chinese  
簡體中文 - Change language to simplified chinese  
English - Change language to English
