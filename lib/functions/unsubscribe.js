const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (userId, topic) =>
  new Promise((resolve, reject) => {
    dynamo.update({
      TableName: 'WeatherPreferences',
      Key: { id: `${topic}-subscribers` },
      UpdateExpression: 'remove #col.#id',
      ExpressionAttributeNames: {
        '#col': 'value',
        '#id': userId.toString()
      }
    }, (err) => {
      err ? reject(err) : resolve();
    });
  });
