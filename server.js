var express = require("express");
var app = express();
var myFriends = require("./app/data/friends.js");
var bodyParser = require("body-parser");
var path = require('path');
var PORT = 3001;
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));






// Routes
// ===========================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/index.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.post("/api/friendcheck", function(req, res){
  console.log(req.body)
});


app.post('/myFriends', (req,res)=>{
  console.log(req.body); //person1

  var surveyObject = req.body;
  var compatabilityFactor = 100
  var bestMatch;
  var compatabilityArray = [];
  
  myFriends.forEach(function(friend, idx){
   console.log(surveyObject.name + surveyObject.scores[0] + "this here")
    var compatibilityScore = 0;
    console.log(compatibilityScore)
    friend.scores.forEach(function(score, idx){
      
    if (surveyObject.scores[idx] == friend.scores [idx]) {
      console.log("you matched at index number " + [idx + 1])
      console.log("After index "+ [idx] +" " + compatibilityScore + " is your Compatability Score!") 
      // compatabilityScore/factor doesn't change
    } else if (surveyObject.scores[idx] > friend.scores[idx]){
    // compatabilityFactor === surveyObject.score[idx] - friend.scores[idx]
      compatibilityScore += surveyObject.scores[idx] - friend.scores[idx]
      console.log("After index "+ [idx] +" " + compatibilityScore + " is your Compatability Score!")
    } else {
      compatibilityScore += friend.scores[idx] - surveyObject.scores[idx]
      console.log("After index "+ [idx] +" " + compatibilityScore + " is your Compatability Score!")    
    }
    return console.log(compatibilityScore)
      // compatibilityScore += Math.abs(score - surveyObject.scores[idx])
    })

    console.log(compatabilityFactor);
    if (compatabilityFactor > compatibilityScore){
      var i = 0;
      console.log(friend)
      compatabilityFactor = compatibilityScore
      console.log(compatibilityScore + " <compatability SCore factor> "+ compatabilityFactor)
      compatabilityArray.push(friend)
      bestMatch = compatabilityArray.length-1
      bestFriend = compatabilityArray[bestMatch]
      console.log(compatabilityArray)
      console.log(bestMatch)
      i++
      console.log(bestFriend)
    }
     
  })
    res.json(bestFriend);
    
})
// ________________________________________________________
//responds letting me know that server is listening.
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
// ________________________________________________________
