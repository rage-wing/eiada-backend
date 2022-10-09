const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');

const Zoom = (() => {
  const createMeeting = async () => {
    const email = process.env.CONTACT_EMAIL;
    const payload = {
      iss: process.env.ZOOM_API_KEY,
      exp: new Date().getTime() + 5000,
    };
    const token = jwt.sign(payload, process.env.ZOOM_API_SECRET);

    const data = {
      topic: 'online reservation with doctor ahmed dabour',
      type: 1,
      settings: {
        host_video: 'true',
        participant_video: 'true',
      },
    };

    const config = {
      headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`https://api.zoom.us/v2/users/${email}/meetings`, data, config);
    return res.data;
  };

  return {
    createMeeting,
  };
})();

module.exports = Zoom;
