const API_URL = "http://localhost:3001/data";

// Haal gegevens op van de server
export const getData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Fout bij ophalen van data");
  }
  return response.json();
};

// Update gegevens op de server
export const saveData = async (updatedData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Fout bij opslaan van data");
  }
};
fetch("http://localhost:3001/data")
  .then((res) => res.json())
  //.then((data) => console.log(data))
  .catch((err) => console.error("Fout:", err));