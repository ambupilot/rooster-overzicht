//import React, { useState } from "react";
import React from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const Table = ({ data, week, handleChange, isEditable }) => {
  // Bereken de datums van de geselecteerde week
  const calculateWeekDates = (weekNumber) => {
    const year = weekNumber >= 51 ? 2024 : 2025; // Week 51 en 52 in 2024, daarna in 2025
    const firstISOWeekStart = dayjs(`${year}-01-01`).startOf("isoWeek");
    const weekStartDate = firstISOWeekStart.add(weekNumber - 1, "week");

    // Genereer datums voor maandag t/m zondag
    return Array.from({ length: 7 }).map((_, index) =>
      weekStartDate.add(index, "day").format("DD-MM-YYYY")
    );
  };

  const weekDates = calculateWeekDates(week); // Bereken de datums voor de geselecteerde week
  const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Kalenderweek: {week}</h2>
      <p className="text-gray-700 mb-4">
        {weekDates[0]} - {weekDates[6]}
      </p>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Dag</th>
            <th className="border px-4 py-2">Datum</th>
            <th className="border px-4 py-2">Dienst</th>
            <th className="border px-4 py-2">Opmerking</th>
            <th className="border px-4 py-2">Beschikbaarheid</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.dagVanDeWeek}>
              <td className="border px-4 py-2">{days[item.dagVanDeWeek - 1]}</td>
              <td className="border px-4 py-2">{weekDates[item.dagVanDeWeek - 1]}</td>
              <td className="border px-4 py-2">{item.dienst || "Geen"}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.opmerkingen || ""}
                  onChange={(e) => handleChange(item.dagVanDeWeek, "opmerkingen", e.target.value)}
                  disabled={!isEditable}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.locoflex || ""}
                  onChange={(e) => handleChange(item.dagVanDeWeek, "locoflex", e.target.value)}
                  disabled={!isEditable}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
