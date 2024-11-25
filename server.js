const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

const PORT = 3001;
const DATA_FILE = "./store-data.json"; // Pad naar store-data.json

app.use(cors());
app.use(express.json());

app.get("/data", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
      if (err) {
        console.error("Fout bij het lezen van data:", err);
        return res.status(500).json({ error: "Kan data niet lezen." });
      }
  
      // Parse de data en vervang "NULL" door een lege string
      const cleanData = JSON.parse(data).map((item) => ({
        ...item,
        locoflex: item.locoflex === "NULL" ? "" : item.locoflex,
      }));
  
      res.json(cleanData);
    });
  });
app.post("/data", (req, res) => {
  const updatedData = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      console.error("Fout bij het opslaan van data:", err);
      return res.status(500).json({ error: "Kan data niet opslaan." });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  //console.log(`Server draait op http://localhost:${PORT}`);
});