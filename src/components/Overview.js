import React from "react";

const Overview = ({ data }) => {
  const generateOverview = () => {
    const header = "| Dag       | Datum       | Beschikbaarheid |";
    const divider = "+-----------+-------------+------------------+";
    const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
    const rows = data.map(
      (item) =>
        `| ${days[item.dagVanDeWeek - 1].padEnd(9)} | ${item.datum.padEnd(11)} | ${item.locoflex.padEnd(16)} |`
    );

    const content = [divider, header, divider, ...rows, divider].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Overzicht.txt";
    a.click();
    URL.revokeObjectURL(url);
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
