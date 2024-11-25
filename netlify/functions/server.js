const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const dataFilePath = path.resolve(__dirname, "../../store-data.json");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      // Haal data op uit JSON-bestand
      const data = readFileSync(dataFilePath, "utf-8");
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      };
    } else if (event.httpMethod === "POST") {
      // Sla data op in JSON-bestand
      const newData = JSON.parse(event.body);
      writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Method not allowed" }),
      };
    }
  } catch (error) {
    console.error("Fout in serverless function:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
