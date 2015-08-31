// BEGIN CUSTOM JAVASCRIPT/jQuery HERE

//Load the existing notes on start
$( document ).ready(function() {

  var i = 0;

  //Loop through notes and display in rows
  for(i = 0; i < localStorage.length; i++) {
    $(".note-container").append('<div class="row note-wrap" id="note-wrap-'+i+'"><div class="row note"><div class="col-xs-offset-1 col-sm-offset-1 col-xs-9 col-sm-10"><p class="notes note-text" id="notes-'+i+'">'+localStorage.getItem("notes-"+i)+'</p></div><div class="col-xs-2 col-sm-1 text-right"><input type="button" class="note-delete btn" id="note-delete-'+i+'" onclick="noteDelete();" value="X"></input></div></div></div>');
  };
});

//Add a new note to the list
function notePush() {

  var i = localStorage.length;

  if ( $("#note-content").val() != "" ) {
    //Push note into localStorage
    localStorage.setItem( "notes-" + i, $("#note-content").val());

    //Append row with note contents to note-container
    $(".note-container").append('<div class="row note-wrap" id="note-wrap-'+i+'"><div class="row note"><div class="col-xs-offset-1 col-sm-offset-1 col-xs-9 col-sm-10"><p class="notes note-text" id="notes-'+i+'">'+localStorage.getItem("notes-"+i)+'</p></div><div class="col-xs-2 col-sm-1 text-right"><input type="button" class="note-delete btn" id="note-delete-'+i+'" onclick="noteDelete();" value="X"></input></div></div></div>');

    //Add animation effect when submitting new task
    $("#note-wrap-" + i).css('display', 'none');
    $("#note-wrap-" + i).slideDown('slow');

    //Reset input value
    $("#note-content").val("");

    //Add to localStorage count
    i++;
  }
  return false;

};

// Remove a note
$(document).on("click", ".note-delete", function() {
  localStorage.removeItem($(this).parent().attr("id"));
  $(this).parent().slideUp('slow', function() {
    $(this).remove();
  });
  // This part resets all the IDs
  for( i = 0; i < localStorage.length; i++) {
    if( !localStorage.getItem("task-"+ i)) {
      localStorage.setItem("task-"+ i, localStorage.getItem('task-' + (i + 1) )); // Moves the id up a level
      localStorage.removeItem("task-"+ (i + 1) );  // Removes the id 1 up from the deleted item
    }
  }
});
