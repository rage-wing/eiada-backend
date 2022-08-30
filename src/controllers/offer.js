const Offer = require('../models/Offer');

const OfferController = (() => {
  const getAll = async (req, res) => {
    const offers = await Offer.paginate();
    res.sends(200, offers);
  };

  const create = async (req, res) => {
    const { file } = req;
    const { thumbnail, ...offerData } = req.body;

    const path = file.path.replace(/\\/g, '/').replace('public/', '');
    const host = process.env.HOSTNAME;

    const offer = new Offer({
      ...offerData,
      thumbnail: `${host}/${path}`,
    });

    await offer.save();
    res.sends(200, offer);
  };

  return {
    getAll,
    create,
  };
})();

module.exports = OfferController;
