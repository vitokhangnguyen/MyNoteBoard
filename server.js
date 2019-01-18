const express = require("express");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

const path = require("path");

const bodyParser = require("body-parser");

const exphbs = require("express-handlebars");

const data_service = require(path.join(__dirname, "data-service.js"));

app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get("/",  (req, res) => {
    data_service.getAllNotes().then((sentData) => res.render("index", {data: sentData})).catch((err) => console.log(err));
});

app.get("/api/notes/highestNoteId", (req, res) => {
    data_service.findMaxNoteId().then((data) => res.send(!data ? {noteId: 0} : data)).catch((err) => console.log(err));
});

app.post("/api/notes", (req, res) => {
    data_service.createNote(req.body).then(() => console.log("Note Added")).catch((err) => console.log(err));
});

app.put("/api/notes", (req, res) => {
    data_service.updateNote(req.body).then(() => console.log("Note Updated")).catch((err) => console.log(err));
});

app.put("/api/notes/position", (req, res) => {
    data_service.updateNotePosition(req.body).then(() => console.log("Note Position Updated")).catch((err) => console.log(err));
});

app.delete("/api/notes/:noteId", (req, res) => {
    data_service.deleteNote(req.params.noteId).then(() => console.log("Note Deleted")).catch((err) => console.log(err));
});

app.use((req, res) => {
    res.status(404).send("<h1>404 - Resource not found</h1>");
});

data_service.initialize()
.then(() => {
    app.listen(HTTP_PORT, () => console.log("Ready to handle requests on port " + HTTP_PORT));
})
.catch((err) => {
    console.log(err);
});