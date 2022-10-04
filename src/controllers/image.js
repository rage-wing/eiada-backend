const Image = require('../models/Image');
const cloudinary = require('cloudinary');

const ImageController = (() => {
  const getAll = async (req, res) => {
    const images = await Image.paginate();
    res.sends(200, images);
  };

  const imageUpload = async (req, res) => {
    const img = await cloudinary.v2.uploader.upload(
      `data:image/png;base64,${req.body.image}`
    );

    const image = new Image({
      ...img,
      createdAt: img.created_at,
    });
    await image.save();

    res.sends(200, image);
  };

  const remove = async (req, res) => {
    const imageId = req.params.id;
    try {
      const image = await Image.findByIdAndDelete(imageId);
      res.sends(200, image);
    } catch (error) {
      res.sends(400, error.message);
    }
  };

  return {
    getAll,
    imageUpload,
    remove,
  };
})();

module.exports = ImageController;
