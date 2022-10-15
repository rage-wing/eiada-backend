const cloudinary = require('cloudinary');
const Article = require('../models/Article');

const ArticleController = (() => {
  const getAll = async (req, res) => {
    const articles = await Article.paginate();
    res.sends(200, articles);
  };

  const create = async (req, res) => {
    const { thumbnail, ...data } = req.body;
    const img = await cloudinary.v2.uploader.upload(
      `data:image/png;base64,${thumbnail}`
    );

    const article = new Article({
      ...data,
      thumbnail: img.url,
    });

    await article.save();
    res.sends(200, article);
  };

  const edit = async (req, res) => {
    const { id } = req.params;
    try {
      const { thumbnail, ...data } = req.body;
      const img = await cloudinary.v2.uploader.upload(
        `data:image/png;base64,${thumbnail}`
      );
      const article = await Article.findByIdAndUpdate(id, {
        ...data,
        thumbnail: img.url,
      });
      res.sends(200, article);
    } catch (error) {
      res.sends(400, error.message);
    }
  };

  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const article = await Article.findByIdAndDelete(id);
      res.sends(200, article);
    } catch (error) {
      res.sends(400, error.message);
    }
  };

  return {
    getAll,
    create,
    edit,
    remove,
  };
})();

module.exports = ArticleController;
