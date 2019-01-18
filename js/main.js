const noteBackgroundColors = [
    "#F1948A" /*light red*/,
    "#C39BD3" /*light purple*/,
    "#5DADE2" /*light blue*/,
    "yellow",
    "#52AD1A" /*leaf green*/ 
];
var curNoteId = "";
var lastColorIndex = -1;
var newlyCreated;

$(document).ready(function() {
    getHighestNoteId();
    $(".note").draggable({
        stop: function(event, ui) {
            var curNote = {
                noteId: parseInt(event.target.id.substr(4)),
                noteY: $("#" + event.target.id).css("top"),
                noteX: $("#" + event.target.id).css("left")
            };
            updateNotePosition(curNote);
        }
    });

    $("button.add").click(function() {
        $("main").append('<div id="note' + idNum + '" class="note">\
<h4 id="note' + idNum + '-title" class="noteTitle"></h4>\
<div id="note' + idNum +'-content" class="noteContent"></div></div>');

        $("#note" + idNum).draggable({
            stop: function(event, ui) {
                var curNote = {
                    noteId: parseInt(event.target.id.substr(4)),
                    noteY: $("#" + event.target.id).css("top"),
                    noteX: $("#" + event.target.id).css("left")
                };
                updateNotePosition(curNote);
            }
        });
        do {
            colorIndex = Math.floor(Math.random() * noteBackgroundColors.length);
        } while (colorIndex == lastColorIndex);
        lastColorIndex = colorIndex;
        $("#note" + idNum).css("background-color", noteBackgroundColors[colorIndex]);

        newlyCreated = true;
        curNoteId = "note" + idNum;
        $("#form-noteTitle").val("");
        $("#form-noteContent").val("");
        $("#overlay").css("display", "block");

        idNum++;
    });

    $("main").on("click", ".note", function(event) {
        newlyCreated = false;
        curNoteId = event.target.id;
        $("#form-noteTitle").val($("#" + curNoteId + "-title").text());
        $("#form-noteContent").val($("#" + curNoteId + "-content").html().replace(/<br>/g, "\n"));
        $("#overlay").css("display", "block");
    });

    $("button.submit").click(function() {
        $("#" + curNoteId + "-title").empty().append($("#form-noteTitle").val());
        $("#" + curNoteId + "-content").empty().append($("#form-noteContent").val().replace(/\n/g, "<br>"));
        let curNote = {
            noteId: parseInt(curNoteId.substr(4)),
            noteTitle: $("#" + curNoteId + "-title").text(),
            noteContent: $("#" + curNoteId + "-content").html(),
            noteBackgroundColor: $("#" + curNoteId).css("background-color"),
            noteX: $("#" + curNoteId).css("left"),
            noteY: $("#" + curNoteId).css("top")
        };
        if (newlyCreated === true)
            addNewNote(curNote);
        else
            updateNote(curNote);
        $("#overlay").css("display", "none");
        curNoteId = "";
    });

    $("button.cancel").click(function() {
        $("#overlay").css("display", "none");
        if (newlyCreated === true)
            $("#" + curNoteId).remove();
        curNoteId = "";
    });

    $("button.remove").click(function() {
        $("#" + curNoteId).remove();
        removeNoteById(parseInt(curNoteId.substr(4)));
        $("#overlay").css("display", "none");
        curNoteId = "";
    });

    $("#overlay").click(function() {
        $("#overlay").css("display", "none");
        if (newlyCreated === true) {
            let curNote = {
                noteId: parseInt(curNoteId.substr(4)),
                noteTitle:"",
                noteContent: "",
                noteBackgroundColor: $("#" + curNoteId).css("background-color"),
                noteX: $("#" + curNoteId).css("left"),
                noteY: $("#" + curNoteId).css("top")
            };
            addNewNote(curNote);
        }
        curNoteId = "";        
    });

    $("#overlay-form, #overlay-form *").click(function(event) {
        event.stopPropagation();
    });
});