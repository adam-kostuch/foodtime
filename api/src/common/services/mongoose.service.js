const mongoose = require('mongoose');

let count = 0;
const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');

  mongoose.connect('mongodb://localhost:27017/rest-test', options).then(() => {
    console.log('MongoDB is connected');
  }).catch(() => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', count += 1);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

exports.mongoose = mongoose;
