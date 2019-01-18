const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    noteId: {
        type: String,
        unique: true,
        index: true
    },
    noteTitle: String,
    noteContent: String,
    noteBackgroundColor: String,
    noteX: String,
    noteY: String
});

var Note;

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb://khangnguyen:khangnguyen99@ds044577.mlab.com:44577/khangnguyen_note_personal_project",
{ useNewUrlParser: true, useCreateIndex: true});

        db.on('error', (err) => reject(err));

        db.once('open', () => {
           Note = db.model("notes", noteSchema);
           resolve();
        });
    });
}

module.exports.findMaxNoteId = function() {
    return new Promise(function(resolve, reject) {
        Note
        .findOne({}).sort('-noteId')
        .exec()
        .then((maxNote) => resolve(maxNote))
        .catch((err) => reject("There was an error finding the highest note id: "+ err));
    })
}

module.exports.createNote = function(noteData) {
    return new Promise(function(resolve, reject) {
        let newNote = new Note(noteData);
        newNote.save((err) => {
            if (err)
                reject("There was an error creating the note: " + err);
            else resolve();
        });
    });
}

module.exports.getAllNotes = function() {
    return new Promise(function(resolve, reject) {
        Note.find({})
        .exec()
        .then((data) => resolve(data))
        .catch((err) => reject("There was an error getting the notes: " + err));
    });
};

module.exports.updateNote = function(noteData) {
    return new Promise(function(resolve, reject) {
        Note.updateOne({noteId: noteData.noteId}, {$set: noteData})
        .exec()
        .then(() => resolve())
        .catch((err) => reject("There was an error updating the note: " + err));
    });
}

module.exports.updateNotePosition = function(newData) {
    return new Promise(function(resolve, reject) {
        Note.updateOne({noteId: newData.noteId}, {$set: {
            noteY: newData.noteY,
            noteX: newData.noteX
        }})
        .exec()
        .then(() => resolve())
        .catch((err) => reject("There was an error updating the note position: " + err));
    });
}

module.exports.deleteNote = function(id) {
    return new Promise(function(resolve, reject) {
        Note.deleteOne({noteId: id})
        .exec()
        .then(() => resolve())
        .catch((err) => reject("There was an error removing the note: " + err));
    });
}