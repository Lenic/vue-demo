module.exports = function(router) {
  router.use(function(req, res, next) {
    const delay = Number(req.get('delay') || 0);

    if (delay) {
      setTimeout(() => next(), delay);
    } else {
      next();
    }
  });

  require('./login')(router);

  return router;
};
