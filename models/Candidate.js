var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CandidateSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  modified: {
    type: Date,
    default: Date.now()
  }
}, {collection: "prospects"});

var Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;

