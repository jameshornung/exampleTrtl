import React, { Component } from 'react';
import './style.css';

const axios = require('axios');


class FilterCandidates extends Component {
  render() {
    return (
      <div>
        <div className="showCandidatesDiv">
          <button onClick = { getAllCandidates } >Show All Prospects</button>
        </div>

        <div>
            <div>
              <p>Select University</p>
              <select id="filterUniversity">
                <option value="">All</option>
                <option value="Berkeley">Berkeley</option>
                <option value="Cambridge">Cambridge</option>
                <option value="Rutgers">Rutgers</option>
                <option value="Texas">Texas</option>
                <option value="UCF">UCF</option>
              </select> 
            </div>
              <div>
                <p>Select Status</p>
                <select id="filterStatus">
                  <option value="">All</option>
                  <option value="Pending HR">Pending HR Interview</option>
                  <option value="Pending Tech">Pending Tech Interview</option>
                  <option value="Pending Final">Pending Final Interview</option>
                </select>
              </div>
              <button onClick = { filter } >Filter Candidates</button>
        </div>

        <div id="results"></div>
        <div className="test"></div>
      </div>
    );
  }
}

export default FilterCandidates;

//-----
//Show all candidates
//-----

const getAllCandidates = () => {
  axios.get('/all')
  .then(function (response) {

    var data = response.data;
    var resultsSection = document.getElementById("results");

    resultsSection.innerHTML = "";

    var resultTitle = document.createElement("h4");
    var titleText = document.createTextNode("All Candidates");
    resultTitle.appendChild(titleText);
    resultsSection.appendChild(resultTitle);

    for (var i=0; i<data.length; i++){
      var candidate = document.createElement("p");

      var deleteOption = document.createElement("span");
      var deleteText = document.createTextNode("Delete");
      deleteOption.setAttribute("className", "deleteCandidate");
      deleteOption.appendChild(deleteText);

      var updateOption = document.createElement("span");
      var updateText = document.createTextNode("Update");
      updateOption.setAttribute("className", "updateCandidate");
      updateOption.appendChild(updateText);

      var candidateInfo = document.createTextNode(data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status);
      
      candidate.setAttribute("data-id", data[i]._id);
      candidate.appendChild(candidateInfo);
      candidate.appendChild(deleteOption);
      candidate.appendChild(updateOption);

      resultsSection.appendChild(candidate);
      // console.log(candidate);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

//-----
//Filter by university and status
//-----

const filter = () => {

  var university = document.getElementById("filterUniversity").value;
  var status = document.getElementById("filterStatus").value;

  axios.get('/filter', {
    params: {
      university: university,
      status: status
    }
  }).then(function(response){

    var data = response.data;
    var resultsSection = document.getElementById("results");

    resultsSection.innerHTML = "";

    var resultTitle = document.createElement("h4");
    var titleText = document.createTextNode("Candidates Matching Criteria");
    resultTitle.appendChild(titleText);
    resultsSection.appendChild(resultTitle);

    for (var i=0; i<data.length; i++){
      var candidate = document.createElement("p");

      var deleteOption = document.createElement("span");
      var deleteText = document.createTextNode("Delete");
      deleteOption.setAttribute("className", "deleteCandidate");
      deleteOption.appendChild(deleteText);

      var updateOption = document.createElement("span");
      var updateText = document.createTextNode("Update");
      updateOption.setAttribute("className", "updateCandidate");
      updateOption.appendChild(updateText);

      var candidateInfo = document.createTextNode(data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status);
      
      candidate.setAttribute("data-id", data[i]._id);
      candidate.appendChild(candidateInfo);
      candidate.appendChild(deleteOption);
      candidate.appendChild(updateOption);

      resultsSection.appendChild(candidate);
      console.log(candidate);
    }
  })
};

//-----
//Click Edit Span
//-----

// jQuery example of functionality

// $(document).on("click", ".updateCandidate", function() {
//   // Save the p tag that encloses the button
//   var selected = $(this).parent();
//   // console.log("selected = ", selected)
//   // Make an ajax call to find the prospect
//   // This uses the data-id of the p-tag, which is linked to the specific prospect
//   $.ajax({
//     type: "GET",
//     url: "/find-one/" + selected.attr("data-id"),
//     success: function(data) {
//       // Fill the inputs on the update form with the data that the ajax call collected
//       $("#updateFirstName").val(data.firstName);
//       $("#updateLastName").val(data.lastName);
//       $("#updateUniversity").val(data.university);
//       $("#updateStatus").val(data.status);
//       // Add a submit button to the form
//       $("#updateButtonHolder").html("<button class='submitButton updateProspect' data-id='" + data._id + "'>Submit</button>");
//     }
//   });
// });


//-----
//Click Delete Span
//-----

// jQuery example of functionality

// $(document).on("click", ".deleteCandidate", function() {
//   // Save the p tag that encloses the button
//   var selected = $(this).parent();
//   // Make an AJAX GET request to delete the specific prospect
//   // this uses the data-id of the p-tag, which is linked to the specific prospect
//   $.ajax({
//     type: "GET",
//     url: "/delete/" + selected.attr("data-id"),

//     // On successful call
//     success: function(response) {
//       // Remove the p-tag from the DOM
//       selected.remove();
//       // Clear the propsect info
//       $("#firstName").val("");
//       $("#lastName").val("");
//       $("#university").val("");
//       $("#status").val("");
//     }
//   });
// });







