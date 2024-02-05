const express = require("express");
const app = express();
const { connectToDb } = require("./database");
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 4000;

connectToDb();

app.use(express.json());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})