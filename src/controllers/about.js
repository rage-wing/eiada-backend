const About = require('../models/About');

const AboutController = (() => {
  const getAbout = async () => {
    return (await About.find().exec())[0];
  };

  const get = async (req, res) => {
    const about = await getAbout();
    res.sends(200, about);
  };

  const update = async (req, res) => {
    await About.findByIdAndUpdate('6308dcfd8ef6d0e796e75e37', req.body);
    res.sends(200);
  };

  return {
    get,
    update,
  };
})();

module.exports = AboutController;
