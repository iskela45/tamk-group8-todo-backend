
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

const db = [{ name: "tiina" }, { name: "jack" }];

app.get("/names", (req, res) => {
  res.send(db);
});

const server = app.listen(8080, () => {
  console.log(`Listening on port ${server.address().port}`);
}); 


const port = process.env.PORT || 8080;
const server = app.listen(port, () => { .. })
