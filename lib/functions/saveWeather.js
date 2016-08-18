const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (id) => (value) =>
  new Promise((resolve, reject) => {
    dynamo.put({
      TableName: 'Weather',
      Item: { id, value }
    }, (err) => {
      err ? reject(err) : resolve(value);
    });
  });
