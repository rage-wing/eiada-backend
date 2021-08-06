const mongoose = require('mongoose');

const DB = (() => {
  const connect = () => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose
      .connect(process.env.DB_HOST, options)
      .then(() => console.log('Mondodb Connected'))
      .catch((err) => console.error(err));
  };

  return {
    connect,
  };
})();

module.exports = DB;
