var idNum;

function makeAJAXRequest(method, url, data, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url);
    if (data) {
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.send(JSON.stringify(data));
    } else httpRequest.send();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 )
            if (httpRequest.status === 200) {
                var responseData = (JSON.parse(httpRequest.responseText));
                if (method == "GET" && url == "/api/notes/highestNoteId")
                    idNum = parseInt(responseData.noteId) + 1;
            }
            else console.log("Error getting data!");
    };
}

var getHighestNoteId = function() {
    makeAJAXRequest("GET", "/api/notes/highestNoteId")
}

var addNewNote = function(data) {
    makeAJAXRequest("POST", "/api/notes", data)
};

var updateNote = function(data) {
    makeAJAXRequest("PUT", "/api/notes", data);
};

var updateNotePosition = function(data) {
    makeAJAXRequest("PUT", "/api/notes/position", data);
}

var removeNoteById = function(noteId) {
    makeAJAXRequest("DELETE", "/api/notes/" + noteId);
}