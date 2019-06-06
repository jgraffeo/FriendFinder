var friends = require("../data/friends");

module.exports = function(app) {

  // retrieves friends data from friends json
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });

  
    app.post("/api/friends", function(req, res) {
      var totalDifference = 0;
      var bestMatch = {
        name: "",
        photo: "",
        difference: 1000
      };

      var userData = req.body;
      var userName = userData.name;
      var userScores = userData.scores;

      var b = userScores.map(function(item) {
        return parseInt(item, 10);
      });
      
      userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: b
      };

      var sum = b.reduce((a, b) => a + b, 0);

      for(var i=0; i < friends.length; i++) {
        totalDifference = 0;
        var friendScore = friends[i].scores.reduce((a, b) => a + b, 0);
        totalDifference += Math.abs(sum - friendScore);

        if (totalDifference <= bestMatch.difference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.difference = totalDifference;
        }
      }

      friends.push(userData);
      res.json(bestMatch);
    });
};
  