module.exports = function(app) {
  app.get('/api', function(req, res) {
    res.send("Welcome to the backend!")
  });
};