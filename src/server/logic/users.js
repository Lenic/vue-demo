
module.exports = function (router) {
  router.get('/users', (req, res) => {
    setTimeout(function () {
      res.json([
        {
          id: 3,
          name: '张三',
        },
        {
          id: 4,
          name: '李四',
        }
      ]).end();
    }, 2000);
  });
}
