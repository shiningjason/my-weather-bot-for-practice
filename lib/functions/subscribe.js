const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (userId, topic) =>
  updateTopic(topic)
    .then(() => updateSubscribe(topic, userId));

function updateTopic(topic) {
  return new Promise((resolve, reject) => {
    dynamo.update({
      TableName: 'WeatherPreferences',
      Key: { id: `${topic}-subscribers` },
      UpdateExpression: 'set #col = if_not_exists(#col, :val)',
      ExpressionAttributeNames: { '#col': 'value' },
      ExpressionAttributeValues: { ':val': {} }
    }, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

function updateSubscribe(topic, userId) {
  new Promise((resolve, reject) => {
    dynamo.update({
      TableName: 'WeatherPreferences',
      Key: { id: `${topic}-subscribers` },
      UpdateExpression: 'set #col.#id = :val',
      ExpressionAttributeNames: { 
        '#col': 'value',
        '#id': userId.toString()
      },
      ExpressionAttributeValues: { ':val': true }
    }, (err) => {
      err ? reject(err) : resolve();
    });
  });
}
