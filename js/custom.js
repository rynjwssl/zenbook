// BEGIN CUSTOM JAVASCRIPT/jQuery HERE

//Load the existing notes on start
$(document).ready(function() {

  var i = 0;

  //Loop through notes and display in rows
  for(i = 0; i < localStorage.length; i++) {
    $(".note-container").prepend('<div class="row note-wrap" id="note-wrap-'+i+'"><div class="row note"><div class="col-xs-3 col-md-1 col-md-offset-1"><p class="notes note-text" id="notes-'+i+'"><input type="button" class="note-delete btn" id="note-delete-'+i+'" value="X"></input><input type="button" class="note-edit btn" id="note-edit-'+i+'" value="E"></input></div><div class="col-xs-9 col-md-9 note-parent"><span class="note-content-text">'+localStorage.getItem("notes-"+i)+'</span></p></div></div></div>');
  };
});

//Add a new note to the list
$('.notePush').submit(function() {

  var i = localStorage.length;

  if ( $("#note-content").val() != "" ) {
    //Push note into localStorage
    localStorage.setItem( "notes-" + i, $("#note-content").val());

    //Append row with note contents to note-container
    $(".note-container").prepend('<div class="row note-wrap" id="note-wrap-'+i+'"><div class="row note"><div class="col-xs-3 col-md-1 col-md-offset-1"><p class="notes note-text" id="notes-'+i+'"><input type="button" class="note-delete btn" id="note-delete-'+i+'" value="X"></input><input type="button" class="note-edit btn" id="note-edit-'+i+'" value="E"></input></div><div class="col-xs-9 col-md-9 note-parent"><span class="note-content-text">'+localStorage.getItem("notes-"+i)+'</span></p></div></div></div>');

    //Add animation effect when submitting new task
    $("#note-wrap-" + i).css('display', 'none');
    $("#note-wrap-" + i).slideDown('slow');

    //Reset input value
    $("#note-content").val("");

    //Add to localStorage count
    i++;
  }
  return false;

});

// Remove a note
$(document).on("click", ".note-parent p input.note-delete", function() {
  localStorage.removeItem($(this).parent().attr("id"));
  $(this).parent().slideUp('slow', function() {
    $(this).remove();
  });
  // This part resets all the IDs
  for( i = 0; i < localStorage.length; i++) {
    if( !localStorage.getItem("notes-"+ i)) {
      localStorage.setItem("notes-"+ i, localStorage.getItem('notes-' + (i + 1) )); // Moves the id up a level
      localStorage.removeItem("notes-"+ (i + 1) );  // Removes the id 1 up from the deleted item
    }
  }
});

// Edit a note
$(document).on("click", ".note-parent p input.note-edit", function() {

  var thisID = $(this).parent().attr("id"); // this is task-0

  $(this).parent().html('<form class="editForm"><input class="noteEdit noteEdit' + thisID + '" placeholder="Press Enter to submit." maxlength="59"></form>')
    .submit(function() {
      localStorage.setItem(thisID, $(".noteEdit" + thisID ).val());
      $(this).html('<input type="button" class="note-delete btn" id="note-delete-'+i+'" value="X"></input><input type="button" class="note-edit btn" id="note-edit-'+i+' value="E"></input>'+localStorage.getItem(thisID));
      return false;
    });
});
