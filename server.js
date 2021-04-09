/* eslint-disable no-undef */
/* eslint-disable no-console */
// ********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server
// ********************************************************************************
// Dependencies
// =============================================================
const express = require('express');
require('dotenv').config();

// Set up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Routes
// =============================================================
// require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
  console.log('Starting React app on PORT:3000')
});
