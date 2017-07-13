//++++++++++++++++++++
//DEPENDENCIES
//++++++++++++++++++++

var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

//++++++++++++++++++++
//MODELS
//++++++++++++++++++++

var Candidate = require("./models/Candidate.js");
var University = require("./models/University.js");
//++++++++++++++++++++
//DECLARE THE APP
//++++++++++++++++++++

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

// +++++++++++++++++
// CONFIG WITH MONGOJS (ORIGINAL SET UP)
// +++++++++++++++++

// // Hook mongojs config to db variable
// var db = mongojs(databaseUrl, collections);

// // Log any mongojs errors to console
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// +++++++++++++++++
// CONFIG WITH MONGOOSE
// +++++++++++++++++

// THIS is the connection we need to use - the old connection (above) currently works for our search routes

mongoose.connect("mongodb://localhost/trtlJR");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
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

// Works with MongoJS connection
// app.get("/all", function(req, res) {
//   db.prospects.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(found);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/all", function(req, res) {
  Candidate.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// =====================

// Works with MongoJS
// app.get("/delete/:id", function(req, res) {
//   db.prospects.remove({
//     "_id": mongojs.ObjectID(req.params.id)
//   }, function(error, removed) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(removed);
//       res.send(removed);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/delete/:id", function(req, res) {
  Candidate.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      console.log(removed);
      res.send(removed);
    }
  })
});

// Works with MongoJS
// app.get("/find-one/:id", function(req, res) {
//   db.prospects.findOne({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, function(error, found) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(found);
//       res.send(found);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/find-one/:id", function(req, res) {
  Candidate.findOne({ _id : req.params.id }, function(error, candidate){
    if (error){
      console.log(error);
      res.send(error);
    }
    else{
      console.log(candidate);
      res.send(candidate);
    }
  })
});


// +++++
// Filter By Custom Parameters
// +++++

// Works for MongoJS
// app.get("/filter/", function(req, res) {

//   var query = {};
//   // console.log("req.query", req.query)

//   if(req.query.university) { query.university = req.query.university }
//   if(req.query.status){ query.status = req.query.status }

//   console.log("query = ", query);

//   db.prospects.find(query, function(error, found) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log("found = ", found);
//       res.send(found);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/filter/", function(req, res) {

  var query = {};
  // console.log("req.query", req.query)

  if(req.query.university) { query.university = req.query.university }
  if(req.query.status){ query.status = req.query.status }

  console.log("query = ", query);

  Candidate.find(query, function(error, found) {
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

// Works for MongoJS
// app.get("/all-schools", function(req, res) {
//   db.schools.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(found);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/all-schools", function(req, res) {
  University.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// Works for MongoJS
// app.get("/delete-school/:id", function(req, res) {
//   db.schools.remove({
//     "_id": mongojs.ObjectID(req.params.id)
//   }, function(error, removed) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(removed);
//       res.send(removed);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/delete-school/:id", function(req, res) {
  University.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      console.log(removed);
      res.send(removed);
    }
  })
});

// Works for MongoJS
// app.get("/find-one-school/:id", function(req, res) {
//   db.schools.findOne({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, function(error, found) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(found);
//       res.send(found);
//     }
//   });
// });

// Refactor for Mongoose
app.get("/find-one-school/:id", function(req, res) {
  University.findOne({ _id : req.params.id }, function(error, university){
    if (error){
      console.log(error);
      res.send(error);
    }
    else{
      console.log(university);
      res.send(university);
    }
  })
});

//-----
//Post Requests
//-----

// ++++++++++++++++++++++++
// FIRST PROJECT 
// ++++++++++++++++++++++++

// THIS IS THE ORIGINAL FUNCTION AND WORKS JUST FINE (DOES NOT USE A SCHEMA, MODEL, MONGOOOSE, ETC)
// ======================

// app.post("/submit", function(req, res) {
//   db.prospects.insert(req.body, function(error, saved) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.send(saved);
//     }
//   });
// });

// ======================

// Connected to Mongoose - Works
app.post("/submit", function(req, res) {

  var newCandidate = new Candidate(req.body);
  // Captures info correctly: verified
  console.log("New Candidate: ", newCandidate);

  newCandidate.save(function(err, doc){
    if (err){
      // This route runs if you force an error (ie leave name field blank)
      console.log("Save Error: ", err);
    }
    else{
      // This else statement is not running, even if there is no error message?????
      console.log("Saved: ", doc);
      // res.send(doc);
    }
  })
});

// END OF PROJECT ONE, THE FOLLOWING ROUTE NEEDS TO BE REFACTORED FOR MONGOOSE
// =================================================================================================

// Works for MongoJS
// app.post("/update/:id", function(req, res) {
//   db.prospects.update({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, {
//     $set: {
//       "firstName": req.body.firstName,
//       "lastName": req.body.lastName,
//       "university": req.body.university,
//       "status": req.body.status,
//       "modified": Date.now()
//     }
//   }, function(error, edited) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// });

// Refactor for Mongoose
app.post("/update/:id", function(req, res) {
  Candidate.findByIdAndUpdate(req.params.id, {
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

//   db.prospects.update({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, {
//     $set: {
//       "firstName": req.body.firstName,
//       "lastName": req.body.lastName,
//       "university": req.body.university,
//       "status": req.body.status,
//       "modified": Date.now()
//     }
//   }, function(error, edited) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// });

// Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
//   if (err) return handleError(err);
//   res.send(tank);
// });

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

// Working for MongoJS
// app.post("/submit-school", function(req, res) {
//   db.schools.insert(req.body, function(error, saved) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.send(saved);
//     }
//   });
// });

// Refactor for Mongoose
app.post("/submit-school", function(req, res) {

  var newUniversity = new University(req.body);
  // console.log(newUniversity);

  newUniversity.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// Working for MongoJS
// app.post("/update-school/:id", function(req, res) {
//   db.schools.update({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, {
//     $set: {
//       "universityName": req.body.universityName,
//       "campusLocation": req.body.campusLocation,
//       "modified": Date.now()
//     }
//   }, function(error, edited) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// });

// Refactor for Mongoose
app.post("/update-school/:id", function(req, res) {
  University.findByIdAndUpdate(req.params.id, {
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
