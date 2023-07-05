const express = require('express');
const cors = require('cors');
const connectToMongo = require('./models/conn')
const app = express();
const PORT = process.env.PORT || 5000;

connectToMongo();

// Set up CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());

//available routes 
app.use("/api", require("./routes/excelFileUpload"))
app.use("/api/employee", require("./routes/employeeRoutes"))

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
