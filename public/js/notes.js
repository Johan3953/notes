$(document).ready(function() {
  /* global moment */

  // noteContainer holds all of our notes
  var noteContainer = $("#notesDisplay");
  var noteCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlenoteDelete);
  $(document).on("click", "button.edit", handlenoteEdit);
  // Variable to hold our notes
  var notes;

  // The code below handles the case where we want to get note notes for a specific user
  var userId = $("#notesContainer").data("uid"); 
  getnotes(userId);


  // This function grabs notes from the database and updates the view
  function getnotes(userid) {

    $.get("/api/usernotes/" + userId, function(data) {
      console.log("notes", data);
      notes = data;
      if (!notes || !notes.length) {
        displayEmpty(userid);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete notes
  function deletenote(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/notes/" + id
    })
    .done(function() {
      getnotes(noteCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed note HTML inside noteContainer
  function initializeRows() {
    noteContainer.empty();
    var notesToAdd = [];
    for (var i = 0; i < notes.length; i++) {
      notesToAdd.push(createNewRow(notes[i]));
    }
    noteContainer.prepend(notesToAdd);
  }

  // This function constructs a note's HTML
  function createNewRow(note) {
   // var formattedDate = new Date(note.createdAt);
   // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newnotePanel = $("<div class='note-panel' data-id='"+note.id+"'>");
    newnotePanel.addClass("panel panel-default");
    var newnotePanelHeading = $("<div>");
    newnotePanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger btn-sm");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("edit btn btn-warning btn-sm");
    var newnoteTitle = $("<h2>");
    var newnotePanelBody = $("<div>");
    newnotePanelBody.addClass("panel-body");
    var newnoteBody = $("<div>");
    newnoteTitle.text(note.beerName + " | " + note.beerType + " | " + note.rating);
    newnoteBody.html("<br>Comments: " + note.notes);
    newnotePanelHeading.append(newnoteTitle);
    newnotePanelBody.append(newnoteBody);
    newnotePanelBody.append(editBtn);
    newnotePanelBody.append(deleteBtn);
    newnotePanel.append(newnotePanelHeading);
    newnotePanel.append(newnotePanelBody);
    return newnotePanel;
  }

  // This function figures out which note we want to delete and then calls deletenote
  function handlenoteDelete() {
    var currentnote = $(this).parents(".note-panel").data("id");
    deletenote(currentnote);
  }

  // This function figures out which note we want to edit and takes it to the appropriate url
  function handlenoteEdit() {
    var currentnote = $(this).parents(".note-panel").data("id");
    editnote(currentnote);
  }

  // This function
  function editnote(id) {
    console.log(id);
  }

  // This function displays a messgae when there are no notes
  function displayEmpty(id) {
    var nonotesYet = $("<p>");
    nonotesYet.text("Click above to get started!");
    newnotePanelBody.prepend(nonotesYet);
  }

  var notesDisplay = $("#addnote");

  function handleFormSubmit(event) { 
    event.preventDefault();

    // Getting jQuery references to the note data, form, and user select
    var noteData = {
          beerName: $("#beerName").val().trim(),
          beerType: $("#beerType").val().trim(),
          rating: $("#beerRating").val().trim(),
          notes: $("#beerNotes").val().trim()
    };

    //get the note
    // Wont submit the note if we are missing a beer name or user
    if (!noteData.beerName) {
      alert("Need a beer name"); //FIXME, put error message on page.
      return;
    } 
    console.log("got it: ");
    console.log(noteData);
    // Constructing a newnote object to hand to the database
    var newnote = noteData;
    newnote.UserId = $("#notesContainer").data("uid"); 

    // If we're updating a note run updatenote to update a note
    // Otherwise run submitnote to create a whole new note
    submitnote(newnote);
  }

  // Adding an event listener for when the form is submitted
  notesDisplay.on("click", handleFormSubmit);

  // Submits a new note and brings user to notes page upon completion
  function submitnote(note) {
    $.post("/api/notes", note, function() {
      window.location.href = "/notes";
    });
  }

});