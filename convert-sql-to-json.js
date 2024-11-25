const fs = require("fs");
const path = require("path");
 
// Pad naar de SQL-dump
const sqlFilePath = path.join(__dirname, "dump.sql"); // Vervang met jouw dumpbestand
const outputFilePath = path.join(__dirname, "store-data.json"); // Waar de JSON moet worden opgeslagen

fs.readFile(sqlFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Fout bij het lezen van het SQL-bestand:", err);
    return;
  }

  // Zoek de INSERT INTO-opdracht voor `RoosterCarolas`
  const insertStatementMatch = data.match(/INSERT INTO `RoosterCarolas`.*?VALUES\s([\s\S]*?);/);

  if (!insertStatementMatch) {
    console.error("Geen geldige INSERT INTO-opdracht gevonden.");
    return;
  }

  const valuesBlock = insertStatementMatch[1];

  // Split de rijen (elk eindigt met een `),` of `)`)
  const rows = valuesBlock
    .split(/\),\s*\(/) // Split op het afsluiten en openen van haakjes
    .map((row) => row.replace(/[\(\);]/g, "")) // Verwijder overgebleven haakjes en puntkomma's
    .map((row) => row.split(",").map((col) => col.trim().replace(/^'(.*)'$/, "$1"))); // Verwijder enkele aanhalingstekens

  // Zet om naar JSON-objecten
  const json = rows.map((row) => ({
    id: parseInt(row[0], 10),
    dagVanDeWeek: parseInt(row[1], 10),
    startKalenderWeek: parseInt(row[2], 10),
    roosterWeek: parseInt(row[3], 10),
    dienst: row[4] || "",
    opmerkingen: row[5] || "",
    locoflex: row[6] || "",
  }));

  // Schrijf naar een JSON-bestand
  fs.writeFile(outputFilePath, JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.error("Fout bij het schrijven van de JSON-data:", err);
    } else {
      console.log(`Data succesvol omgezet naar ${outputFilePath}`);
    }
  });
});
