const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (userId) =>
  new Promise((resolve, reject) => {
    dynamo.get({
      TableName: 'WeatherPreferences',
      Key: {
        id: `user-${userId}-lang`
      }
    }, (err, data) => {
      err ? reject(err) : resolve(data.Item ? data.Item.value : 'en');
    });
  });
