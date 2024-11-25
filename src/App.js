import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Overview from "./components/Overview";
import { getData, saveData } from "./store";

const App = () => {
  const [data, setData] = useState([]);
  const [week, setWeek] = useState(51);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverData = await getData();
        setData(serverData);
      } catch (err) {
        console.error("Fout bij ophalen van data:", err);
      }
    };
    fetchData();
  }, []);

  const weekData = data.filter((item) => item.startKalenderWeek === week);
  const availableWeeks = [...new Set(data.map((item) => item.startKalenderWeek))];

  const handleChange = (dagVanDeWeek, key, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.startKalenderWeek === week && item.dagVanDeWeek === dagVanDeWeek
          ? { ...item, [key]: value || "" }
          : item
      )
    );
  };

  const handleSave = async () => {
    try {
      await saveData(data);
      alert("Gegevens succesvol opgeslagen!");
    } catch (err) {
      console.error("Fout bij opslaan van data:", err);
      alert("Opslaan mislukt.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Rooster Beheer</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Kalenderweek:</label>
        <select
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-lg"
        >
          {availableWeeks.map((w) => (
            <option key={w} value={w}>
              Week {w}
            </option>
          ))}
        </select>
      </div>

      <Table
        data={weekData}
        handleChange={handleChange}
        isEditable={isEditable}
      />

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Opslaan
        </button>
        <div>
          <label className="text-gray-700 font-medium">Bewerken toestaan:</label>
          <select
            value={isEditable ? "aan" : "uit"}
            onChange={(e) => setIsEditable(e.target.value === "aan")}
            className="ml-2 p-2 border border-gray-300 rounded-lg"
          >
            <option value="uit">Uit</option>
            <option value="aan">Aan</option>
          </select>
        </div>
      </div>

      <Overview data={weekData} />
    </div>
  );
};

export default App;