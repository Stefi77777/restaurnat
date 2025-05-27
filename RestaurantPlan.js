import React, { useState } from 'react';

const initialTables = [
  { id: 1, name: "Masa 1", position: "Lângă geam", seats: 2, reserved: false },
  { id: 2, name: "Masa 2", position: "Colț dreapta", seats: 4, reserved: true },
  { id: 3, name: "Masa 3", position: "Lângă bar", seats: 6, reserved: false }
];

export default function RestaurantPlan() {
  const [tables, setTables] = useState(initialTables);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");

  const reserveTable = () => {
    setTables(tables.map(t => t.id === selected.id ? { ...t, reserved: true } : t));
    setSelected(null);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>La Gianny – Plan mese</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 15, marginTop: 20 }}>
        {tables.map(table => (
          <div
            key={table.id}
            onClick={() => !table.reserved && setSelected(table)}
            style={{
              padding: 15,
              background: table.reserved ? "#e74c3c" : "#2ecc71",
              color: "white",
              borderRadius: 10,
              cursor: table.reserved ? "not-allowed" : "pointer",
              textAlign: "center"
            }}
          >
            <strong>{table.name}</strong><br />
            {table.position}<br />
            {table.seats} locuri
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: 20 }}>
          <h4>Rezervă {selected.name}</h4>
          <input
            type="text"
            placeholder="Numele tău"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: 8, marginRight: 10 }}
          />
          <button onClick={reserveTable} disabled={!name}>
            Confirmă rezervarea
          </button>
        </div>
      )}
    </div>
  );
}
