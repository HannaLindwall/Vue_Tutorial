const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const cleaning = require("./routes/api/cleaning");
const home = require("./routes/api/home");
const laundry = require("./routes/api/laundry");

app.use("/api/cleaning", cleaning);
app.use("/api/home", home);
app.use("/api/laundry", laundry);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));