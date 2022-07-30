const multer = require('multer');

const initStorage = (folder) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `public/${folder}`);
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return storage;
};

const storage = initStorage('uploads');
const upload = multer({ storage });

module.exports = { upload, initStorage };
