//import express, cors, node-fetch, helmet, body parser and declare an ENV variable for PORT
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
//const path = require('path');
//const publicPath = path.join(__dirname, '..', 'public');

//app.use(express.static(publicPath));

//use cors
app.use(cors());

//use helmet
app.use(helmet());

//use body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get('*', (req, res) => {
  //res.sendFile(path.join(publicPath, 'index.html'))
//})

//start the server on the port declared above
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//create a variable called fetchData to make the API to the itunes API using params passed as arguments
const fetchData = async (query, entity) => {
  const apiCall = await fetch(
    `https://itunes.apple.com/search?term=${query}&entity=${entity}`
  );
  const response = await apiCall.json();
  //return the reponse from the API call
  return response;
};

/*create a put request to handle the put request from the end. 
Receive params from frontend and pass them to the fetchData variable which is called here*/
app.put("/:query/:entity", (req, res) => {
  const { query, entity } = req.params;
  fetchData(query, entity)
    .then((data) => res.json(data.results))
    .catch((err) => console.log("Something broke"));
});
