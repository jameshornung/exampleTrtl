//++++++++++++++++++++
// MATERIALIZE FUNTIONALITY
//++++++++++++++++++++

 $('select').material_select();



//++++++++++++++++++++
// CLICK EVENTS
//++++++++++++++++++++

$(document).on("click", "#allProspects", function(){
  $("#results").empty();

  $.getJSON("/all", function(data) {

    for (var i = 0; i < data.length; i++) {
      $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
      data[i]._id + ">" + data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status + " " + "</span><span class=deleter>Delete</span><span class=update>Edit</span></p>");
    }
  })
});

//Click add-prospect button (submit entry form)
$(document).on("click", "#addProspect", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit",
    data: {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      university: $("#university").val(),
      status: $("#status").val(),
      created: Date.now()
    }
  })
  .done(function(data) {
    
    $("#results").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
      data._id + ">" + data.firstName + " " + data.lastName + " " + data.university + " " + data.status + " " + "</span><span class=deleter updateProspect>Delete</span><span class=update updateProspect>Edit</span></p>");

    $("#firstName").val("");
    $("#lastName").val("");
    $("#university").val("");
    $("#status").val("");
  });
});

// Click "Delete" (delete a prospect)
$(document).on("click", ".deleter", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an AJAX GET request to delete the specific prospect
  // this uses the data-id of the p-tag, which is linked to the specific prospect
  $.ajax({
    type: "GET",
    url: "/delete/" + selected.attr("data-id"),

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      // Clear the propsect info
      $("#firstName").val("");
      $("#lastName").val("");
      $("#university").val("");
      $("#status").val("");
    }
  });
});

// Click "Edit" (update a prospect)
$(document).on("click", ".update", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // console.log("selected = ", selected)
  // Make an ajax call to find the prospect
  // This uses the data-id of the p-tag, which is linked to the specific prospect
  $.ajax({
    type: "GET",
    url: "/find-one/" + selected.attr("data-id"),
    success: function(data) {
      // Fill the inputs on the update form with the data that the ajax call collected
      $("#updateFirstName").val(data.firstName);
      $("#updateLastName").val(data.lastName);
      $("#updateUniversity").val(data.university);
      $("#updateStatus").val(data.status);
      // Add a submit button to the form
      $("#updateButtonHolder").html("<button class='submitButton updateProspect' data-id='" + data._id + "'>Submit</button>");
    }
  });
});

// Click "Update" button (submit update form)
$(document).on("click", ".updateProspect", function() {
  // Save the selected element
  var selected = $(this);
  console.log("selected ", selected);
  $.ajax({
    type: "POST",
    url: "/update/" + selected.attr("data-id"),
    dataType: "json",
    data: {
      firstName: $("#updateFirstName").val(),
      lastName: $("#updateLastName").val(),
      university: $("#updateUniversity").val(),
      status: $("#updateStatus").val()
    },
    // On successful call
    success: function(data) {
      // Clear the inputs
      $("#updateFirstName").val("");
      $("#updateLastName").val("");
      $("updateUniversity").val("");
      $("updateStatus").val("");

      //remove the update button
      $("#updateButtonHolder").empty();

      //empty the results div
      $("#results").empty();
    }
  });
});


$(document).on("click", "#filtersSubmitButton", function() {
  
  var university = $("#filterUniversity").val();
  var status = $("#filterStatus").val();

  $.ajax({
    type: "GET",
    url: "/filter?university=" + university + "&status=" + status,
    success: function(data) {

      $("#results").empty();
      for (var i = 0; i < data.length; i++) {
      $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
      data[i]._id + ">" + data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status + " " + "</span><span class=deleter>Delete</span><span class=update>Edit</span></p>");
    }
  
    }
  });
});


// UNIVERSITY FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Working
$(document).on("click", "#allSchools", function(){
  $("#results").empty();

  $.getJSON("/all-schools", function(data) {

    for (var i = 0; i < data.length; i++) {
      $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
      data[i]._id + ">" + data[i].universityName + " " + data[i].campusLocation + " " + "</span><span class=deleteSchool>Delete</span><span class=updateSchool>Edit</span></p>");
    }
  })
});

// Working
$(document).on("click", "#addUniversity", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit-school",
    data: {
      universityName: $("#universityName").val(),
      campusLocation: $("#campusLocation").val(),
      created: Date.now()
    }
  })
  .done(function(data) {
    
    $("#results").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
      data._id + ">" + data.universityName + " " + data.campusLocation + " " +  "</span><span class=deleteSchool>Delete</span><span class=updateSchool>Edit</span></p>");

    $("#universityName").val("");
    $("#campusLocation").val("");
  });
});


// ======= Work in Progress

// Click "Delete" (delete a prospect)
$(document).on("click", ".deleteSchool", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an AJAX GET request to delete the specific prospect
  // this uses the data-id of the p-tag, which is linked to the specific prospect
  $.ajax({
    type: "GET",
    url: "/delete-school/" + selected.attr("data-id"),

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      // Clear the propsect info
      $("#schoolName").val("");
      $("#campusLocation").val("");
    }
  });
});

// Click "Edit" (update a school)
$(document).on("click", ".updateSchool", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an ajax call to find the prospect
  // This uses the data-id of the p-tag, which is linked to the specific prospect
  $.ajax({
    type: "GET",
    url: "/find-one-school/" + selected.attr("data-id"),
    success: function(data) {
      console.log(data);
      // Fill the inputs on the update form with the data that the ajax call collected
      $("#updateUniversityName").val(data.universityName);
      $("#updateCampusLocation").val(data.campusLocation);
      // Add a submit button to the form
      $("#schoolUpdateButtonHolder").html("<button class='submitButton updateSchoolButton' data-id='" + data._id + "'>Submit</button>");
    }
  });
});

// Click "Update" button (submit update form)
$(document).on("click", ".updateSchoolButton", function() {
  // Save the selected element
  var selected = $(this);
  // console.log("this ", this);
  $.ajax({
    type: "POST",
    url: "/update-school/" + selected.attr("data-id"),
    dataType: "json",
    data: {
      universityName: $("#updateUniversityName").val(),
      campusLocation: $("#updateCampusLocation").val()
    },
    // On successful call
    success: function(data) {
      // Clear the inputs
      $("#updateUniversityName").val("");
      $("#updateCampusLocation").val("");

      //remove the update button
      $("#schooUpdateButtonHolder").empty();

      //empty the results div
      $("#results").empty();
    }
  });
});

