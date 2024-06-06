const express = require("express");
const cors = require("cors");
require("./models/db");
const app = express();

app.use(cors());
app.use(express.json());






// For any "Unassigned endpionts"
app.use("*", (req, res) => res.status(404).json("NO content at this path"));


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
  