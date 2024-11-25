import React from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear); // Activeer ondersteuning voor weeknummers

const Overview = ({ data, week }) => {
  const generateOverview = () => {
    try {
      // Bereken datums van de week (maandag t/m zondag)
      const baseDate = dayjs().week(week).startOf("week");
      const weekDates = Array.from({ length: 7 }).map((_, index) =>
        baseDate.add(index, "day").format("DD-MM-YYYY")
      );

      // console.log("Weekdatums:", weekDates);

      // Bouw de header met de kalenderweek
      const header = `
      ============================================
                     Kalenderweek: ${week}
      ============================================
      `;

      // Tabelkop
      const tableHeader = `| Dag       | Datum       | Beschikbaarheid |`;
      const divider = `+-----------+-------------+------------------+`;

      const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

      // Genereer rijen voor de tabel
      const rows = data.map((item) => {
        const dag = (days[item.dagVanDeWeek - 1] || "").padEnd(9); // Dagnaam
        const datum = weekDates[item.dagVanDeWeek - 1]; // Match datum met dag
        const beschikbaarheid = (item.locoflex || "Geen").padEnd(16); // Beschikbaarheid
        return `| ${dag} | ${datum.padEnd(11)} | ${beschikbaarheid} |`;
      });

      // console.log("Tabelrijen:", rows);

      // Combineer alles tot een volledig overzicht
      const content = [header, divider, tableHeader, divider, ...rows, divider].join("\n");

      // console.log("Overzichtsinhoud:", content);

      // Maak een Blob van de inhoud
      const blob = new Blob([content], { type: "text/plain" });

      // Genereer een downloadbare link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Overzicht-${week}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Vrijgeven van de gegenereerde URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Fout bij genereren overzicht:", error);
    }
  };

  return (
    <button
      onClick={generateOverview}
      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 mt-4"
    >
      Overzicht Genereren
    </button>
  );
};

export default Overview;
