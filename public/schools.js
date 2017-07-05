$(document).on("click", "#all", function(){
  $("#results").empty();

  $.getJSON("/all", function(data) {
    // console.log("data= ", data);

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
      $("#updateButtonHolder").html("<button class='submitButton' id='updater' data-id='" + data._id + "'>Submit</button>");
    }
  });
});

// Click "Update" button (submit update form)
$(document).on("click", "#updater", function() {
  // Save the selected element
  var selected = $(this);
  // console.log("this ", this);
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

      //remove the update button
      $("#updateButtonHolder").empty();

      //empty the results div
      $("#results").empty();
    }
  });
});

// FILTER BY UNIVERSITY
// $(document).on("click", "#filtersSubmitButton", function() {
  
//   var university = $("#filterUniversity").val();

//   $.ajax({
//     type: "GET",
//     url: "/find/" + university,
//     success: function(data) {

//       $("#results").empty();
//       for (var i = 0; i < data.length; i++) {
//       $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
//       data[i]._id + ">" + data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status + " " + "</span><span class=deleter>Delete</span><span class=update>Edit</span></p>");
//     }
  
//     }
//   });
// });


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