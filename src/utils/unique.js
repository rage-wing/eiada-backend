module.exports = (error, _doc, next) => {
  // if unique key mongo error
  if (error.name === 'MongoError' && error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    const val = Object.values(error.keyValue)[0];
    next(new Error(`'${val}' already exists. try another ${key}`));
  } else {
    next();
  }
};
