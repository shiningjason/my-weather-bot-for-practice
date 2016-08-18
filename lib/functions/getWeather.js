const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (id) =>
  new Promise((resolve, reject) => {
    dynamo.get({
      TableName: 'Weather',
      Key: { id }
    }, (err, data) => {
      err ? reject(err) : resolve(data.Item ? data.Item.value : {});
    });
  });
