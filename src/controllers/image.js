const Image = require('../models/Image');
const cloudinary = require('cloudinary');

const ImageController = (() => {
  const getAll = async (req, res) => {
    const images = await Image.paginate();
    res.sends(200, images);
  };

  const imageUpload = async (req, res) => {
    // const { base64, ...other } = req.body.image;

    console.log(req.body.image.fileName);

    //     cloudinary.v2.uploader
    // .upload(`data:image/png;base64,${file.base64}`)

    // const image = new Image({
    //   url: `${host}/${path}`,
    //   ...file,
    // });
    // await image.save();
    // console.log(req.body.image);
    res.sends(200, file);
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
