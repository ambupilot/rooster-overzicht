const Table = ({ data, handleChange, isEditable }) => {
  const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

  return (
    <table className="table-auto w-full bg-white rounded-lg shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">Dag</th>
          <th className="p-2 text-left">Datum</th>
          <th className="p-2 text-left">Dienst</th>
          <th className="p-2 text-left">Beschikbaarheid</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="p-2">{days[item.dagVanDeWeek - 1]}</td>
            <td className="p-2">{item.datum || ""}</td>
            <td className="p-2">{item.dienst || ""}</td>
            <td className="p-2">
              <input
                type="text"
                value={item.locoflex === "NULL" ? "" : item.locoflex || ""}
                disabled={!isEditable}
                onChange={(e) => handleChange(item.dagVanDeWeek, "locoflex", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
