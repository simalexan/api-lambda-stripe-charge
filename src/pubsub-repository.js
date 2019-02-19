const AWS = require('aws-sdk'),
  sns = new AWS.SNS(),
  NO_DATA_REPLY = 'You must provide data to the your PubSub';

module.exports = {
  publish: function publish(data, topic, pubSub = sns) {
    if (!data) {
      return Promise.reject(NO_DATA_REPLY);
    }
    return pubSub.publish({
        Message: JSON.stringify(data),
        TopicArn: topic
    })
    .promise()
    .catch(err => {
        console.log(err);
        return err;
    });
  }
};
