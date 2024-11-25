const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const dataFilePath = path.join(process.cwd(), "store-data.json");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      // Data ophalen
      const data = readFileSync(dataFilePath, "utf-8");
      return {
        statusCode: 200,
        body: data,
      };
    } else if (event.httpMethod === "POST") {
      // Data opslaan
      const newData = JSON.parse(event.body);
      writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
    }
  } catch (error) {
    console.error("Server error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
