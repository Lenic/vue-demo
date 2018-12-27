const { Random } = require('mockjs');

const pack = require('./pack');

module.exports = function(router) {
  router.post('/login', (req, res) =>
    res.json(pack({ uid: 'admin', mobile: '18888888888', token: Date.now().toString(16) }))
  );
};
