// Import Statements to import required modules
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3300;

const connectDatabase = require("./config/database");
const apiRoutes = require("./routes");

//Connect Database Connection
connectDatabase();

// Application using JSON
app.use(express.json());

// basic endpoint to check if server is running
app.get("/", (req, res) => {
	res.send(`Hey,I am Backend Server`);
});

// Application using Cors
app.use(cors());

// Application importing routes from routes folder
app.use("/api", apiRoutes);

// Application initializing server at PORT
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
