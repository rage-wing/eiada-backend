const Article = require('../models/Article');

const ArticleController = (() => {
  const getAll = async (req, res) => {
    const articles = await Article.paginate();
    res.sends(200, articles);
  };

  const create = async (req, res) => {
    const { file } = req;
    const { thumbnail, ...articleData } = req.body;

    const path = file.path.replace(/\\/g, '/').replace('public/', '');
    const hostname = req.get('host').replace('localhost', process.env.HOSTNAME);

    const host = `${req.protocol}://${hostname}`;

    const article = new Article({
      ...articleData,
      thumbnail: `${host}/${path}`,
    });

    await article.save();
    res.sends(200, article);
  };

  return {
    getAll,
    create,
  };
})();

module.exports = ArticleController;
