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

// get all candidates in the collection
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

// delete a single candidate from the collection
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

// find a single candidate (by unique id)
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

// get all schools from the universities collection
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

// delete a school
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

// find one school in the university collection (by unique id)
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

// Csubmit a new candidate
app.post("/submit", function(req, res) {

  var newCandidate = new Candidate(req.body);
  
  console.log("New Candidate: ", newCandidate);

  newCandidate.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// update a single candidate
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

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

// add a new school to the university collection
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


// update an existing school in the university collection
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
