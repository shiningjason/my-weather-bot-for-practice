const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (userId, value) =>
  new Promise((resolve, reject) => {
    dynamo.put({
      TableName: 'WeatherPreferences',
      Item: {
        id: `user-${userId}-lang`,
        value
      }
    }, (err) => {
      err ? reject(err) : resolve();
    });
  });
