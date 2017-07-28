var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UniversitySchema = new Schema({
  universityName: {
    type: String,
    required: true
  },
  campusLocation: {
    type: String,
    required: true
  },
  program: {
    type: Array,
    default: ["FSF", "DATA", "UI/UX"],
    required: true
  },
  modified: {
    type: Date,
    default: Date.now()
  }
}, {collection: "universities"});

var University = mongoose.model("Univeristy", UniversitySchema);

module.exports = University;