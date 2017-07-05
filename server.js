//++++++++++++++++++++
//DEPENDENCIES
//++++++++++++++++++++

var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();

//++++++++++++++++++++
//CONFIGURE THE APP
//++++++++++++++++++++

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));

//++++++++++++++++++++
//DATABASE CONFIGURATION
//++++++++++++++++++++

var databaseUrl = "trtlJR";
var collections = ["prospects", "schools"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//++++++++++++++++++++
//ROUTES
//++++++++++++++++++++

//-----
//Get Requests
//-----

app.get("/", function(req, res) {
  res.send(index.html);
});

app.get("/all", function(req, res) {
  db.prospects.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/delete/:id", function(req, res) {
  db.prospects.remove({
    "_id": mongojs.ObjectID(req.params.id)
  }, function(error, removed) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(removed);
      res.send(removed);
    }
  });
});

app.get("/find-one/:id", function(req, res) {
  db.prospects.findOne({
    "_id": mongojs.ObjectId(req.params.id)
  }, function(error, found) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(found);
      res.send(found);
    }
  });
});

// +++++
// Filter By Custom Parameters
// +++++

app.get("/filter/", function(req, res) {

  var query = {};
  console.log("req.query", req.query)

  if(req.query.university) { query.university = req.query.university }
  if(req.query.status){ query.status = req.query.status }

  console.log("query = ", query);

  db.prospects.find(query, function(error, found) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log("found = ", found);
      res.send(found);
    }
  });
});

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

app.get("/all-schools", function(req, res) {
  db.schools.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

//-----
//Post Requests
//-----

app.post("/submit", function(req, res) {
  db.prospects.insert(req.body, function(error, saved) {
    if (error) {
      console.log(error);
    }
    else {
      res.send(saved);
    }
  });
});

app.post("/update/:id", function(req, res) {
  db.prospects.update({
    "_id": mongojs.ObjectId(req.params.id)
  }, {
    $set: {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "university": req.body.university,
      "status": req.body.status,
      "modified": Date.now()
    }
  }, function(error, edited) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(edited);
      res.send(edited);
    }
  });
});

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

app.post("/submit-school", function(req, res) {
  db.schools.insert(req.body, function(error, saved) {
    if (error) {
      console.log(error);
    }
    else {
      res.send(saved);
    }
  });
});

app.post("/update-school/:id", function(req, res) {
  db.prospects.update({
    "_id": mongojs.ObjectId(req.params.id)
  }, {
    $set: {
      "universityName": req.body.universityName,
      "campusLocation": req.body.campusLocation,
      "modified": Date.now()
    }
  }, function(error, edited) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(edited);
      res.send(edited);
    }
  });
});


//++++++++++++++++++++
//LISTEN ON PORT 3000
//++++++++++++++++++++

app.listen(3000, function() {
  console.log("Success: Running on Port 3000");
});
