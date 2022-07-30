const Image = require('../models/Image');

const ImageController = (() => {
  const getAll = async (req, res) => {
    const images = await Image.paginate();
    res.sends(200, images);
  };

  const imageUpload = async (req, res) => {
    const { file } = req;
    const path = file.path.replace(/\\/g, '/').replace('public/', '');
    const hostname = req.get('host').replace('localhost', process.env.HOSTNAME);

    const host = `${req.protocol}://${hostname}`;
    const image = new Image({
      url: `${host}/${path}`,
      ...file,
    });
    await image.save();
    res.sends(200, image);
  };

  return {
    getAll,
    imageUpload,
  };
})();

module.exports = ImageController;
