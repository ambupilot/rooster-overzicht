import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek); // Gebruik ISO-weken

const API_BASE_URL = "/.netlify/functions/server";

const App = () => {
  const [data, setData] = useState([]);
  const [week, setWeek] = useState(51); // Start met kalenderweek 51
  const [isEditable, setIsEditable] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Ophalen van gegevens bij het laden van de app
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}`);
        const result = await response.json();
        // Zorg dat de data een array is
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Fout bij ophalen van data:", error);
        setNotification({ message: "Fout bij ophalen van data", type: "error" });
      }
    };

    fetchData();
  }, []);

  const weekData = Array.isArray(data)
    ? data.filter((item) => item.startKalenderWeek === week)
    : [];
  const availableWeeks = Array.isArray(data)
    ? [...new Set(data.map((item) => item.startKalenderWeek))]
    : [];

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
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setNotification({ message: "Gegevens succesvol opgeslagen!", type: "success" });
      } else {
        setNotification({ message: "Opslaan mislukt.", type: "error" });
      }
    } catch (err) {
      console.error("Fout bij opslaan van data:", err);
      setNotification({ message: "Opslaan mislukt.", type: "error" });
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const downloadOverview = () => {
    const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
    const year = week >= 51 ? 2024 : 2025;
    const firstISOWeekStart = dayjs(`${year}-01-01`).startOf("isoWeek");
    const weekStartDate = firstISOWeekStart.add(week - 1, "week");

    const weekDates = Array.from({ length: 7 }).map((_, index) =>
      weekStartDate.add(index, "day").format("DD-MM-YYYY")
    );

    const header = `
============================================
      Beschikbaarheid M. Kerssing
      Kalenderweek: ${week}
============================================
    `;

    const tableHeader = `| Dag       | Datum       | Beschikbaarheid |`;
    const divider = `+-----------+-------------+------------------+`;

    const rows = weekData.map((item) => {
      const day = (days[item.dagVanDeWeek - 1] || "").padEnd(9);
      const date = (weekDates[item.dagVanDeWeek - 1] || "Onbekend").padEnd(11);
      const beschikbaarheid = (item.locoflex || "Geen").padEnd(16);
      return `| ${day} | ${date} | ${beschikbaarheid} |`;
    });

    const content = [header, divider, tableHeader, divider, ...rows, divider].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Overzicht-${week}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        week={week}
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
        <button
          onClick={downloadOverview}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-4"
        >
          Overzicht Downloaden
        </button>
        <div>
          <label className="text-gray-700 font-medium ml-4">Bewerken toestaan:</label>
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

      {notification.message && (
        <div
          className={`p-4 mt-4 text-white rounded ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default App;
